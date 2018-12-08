from boa.interop.System.Runtime import Log
from boa.interop.System.Runtime import Notify
from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.builtins import concat,Serialize,Deserialize
from boa.interop.Ontology.Native import Invoke

MESIToken = RegisterAppCall('fa80553aec57a57d406cde1549b47f0bad96f7c4', 'operation', 'args')


ctx = GetContext()
contractAddress = bytearray(b'\xc4\xf7\x96\xad\x0b\x7f\xb4\x49\x15\xde\x6c\x40\x7d\xa5\x57\xec\x3a\x55\x80\xfa')

def Main(operation, args):
    if operation == 'Hello': # operationを見てDispatch
        msg = args[0]
        return Hello(msg)

    if operation == 'RegisterPerson':
        return RegisterPerson(args[0], args[1])
    
    if operation == 'ReadPerson':
        return ReadPerson(args[0])
    
    if operation == 'RegisterCompany':
        return RegisterCompany(args[0], args[1])
        
    if operation == 'ReadCompany':
        return ReadCompany(args[0])
    
    if operation == 'CloseAuction':
        return CloseAuction(args[0])
    
    if operation == 'transfer':
        return transfer(args[0],args[1],args[2])


    return False
    
def Hello(msg):
    Notify(msg) 
    return True 
    
def RegisterPerson(personAddr, info):
    Notify(personAddr)
    key = concat("person_", personAddr)
    Put(ctx, key, info)
    v = Get(ctx, key)
    Notify(v)
    
    return True

def ReadPerson(personAddr):
    key = concat("person_", personAddr)
    Notify(key)
    v = Get(ctx, key)
    Notify(v)

    return v

def RegisterCompany(companyAddr, info):
    key = concat("company_", companyAddr)
    Put(ctx, key, info)
    return True
    
def ReadCompany(companyAddr):
    key = concat("company_", companyAddr)
    v = Get(ctx, key)
    Notify(v)

    return v
    

    
def ReadBids(auctionAddr):
    bids = list()
    # get latest bid index
    idx = Get(ctx, concat('latest_bid_index_', auctionAddr));
    for i in range(idx):
        key = concat(concat('bid_', auctionAddr), i)
        v = Get(ctx, key)
        if v:
            bids.append(v)
        
    
    return bids


def ReadAuction(auctionAddr):
    # get auction entity
    ReadBids(auctionAddr)
    return Get(ctx, concat('auction_',auctionAddr))

def CloseAuction(personAddr):
    
    # get highest bid
    bids = []
    # get latest bid index
    idx = Get(ctx, concat('latest_bid_index_', personAddr));
    if idx <= 0 :
        return False
    
    i = 0
    while i < idx:
        key = concat(concat('bid_', personAddr), i)
        v = Get(ctx, key)
        if v:
            bids.append(v)
    
    highestBids = getHighestBid(bids)

    amount = highestBids['price']
    nextCompanyAddress = highestBids['company_address']

    # check amount of next company address
#    if amount > BalanceOf(nextCompanyAddress):
 #       return False
    
    # get current company address
    personData = ReadPerson(personAddr)
    currentCompanyAddress = personData['company']
        
    # transfer
    transfer(nextCompanyAddress, currentCompanyAddress, amount)
    
    # change company
    personData['company'] = nextCompanyAddress
    RegisterPerson(personAddr, personData)
    
    

def getHighestBid(bids):
    high = bids[0]
    for bid in bids:
        if bid["price"] > high['price']:
            high = bid
            
    return high
    

def transfer(fromacct, toacct, amount):

    res = MESIToken( 'transfer', [fromacct, toacct, amount])
    Notify(res)

    if res and res == b'\x01':
        Notify('transfer succeed')
        return True
    else:
        Notify('transfer failed')

        return False


def makeState(fromacct, toacct, amount):
    return state(fromacct, toacct, amount)
