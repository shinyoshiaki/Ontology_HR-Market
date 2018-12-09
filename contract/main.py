from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.interop.System.Runtime import Notify, Serialize, Deserialize, GetTime, Notify, Log
from boa.builtins import concat
from boa.interop.Ontology.Native import Invoke

MESIToken = RegisterAppCall('fa80553aec57a57d406cde1549b47f0bad96f7c4', 'operation', 'args')

ctx = GetContext()
contractAddress = bytearray(b'\xc4\xf7\x96\xad\x0b\x7f\xb4\x49\x15\xde\x6c\x40\x7d\xa5\x57\xec\x3a\x55\x80\xfa')

def Main(operation, args):

    if operation == 'RegisterPerson':
        return RegisterPerson(args[0], args[1], args[2])
    
    if operation == 'ReadPerson':
        return ReadPerson(args[0])
    
    if operation == 'RegisterCompany':
        return RegisterCompany(args[0], args[1])
    
    if operation == 'RegisterCompanyPerson':
        return RegisterCompanyPerson(args[0], args[1])
    
    if operation == 'ReadCompany':
        return ReadCompany(args[0])
    
    if operation == 'RegisterAuction':
        return RegisterAuction(args[0], args[1], args[2], args[3])
        
    if operation == 'RegisterBid':
        return RegisterBid(args[0], args[1], args[2])
        
    if operation == 'ReadBids':
        return ReadBids(args[0])
        
    if operation == 'CloseAuction':
        return CloseAuction(args[0])
    
    if operation == 'transfer':
        return transfer(args[0],args[1],args[2])

    return False


def RegisterPerson(personAddr, name, company):
    key = concat("person_", personAddr)
    val = makeValue([name, company], '$')

    Put(ctx, key, val)

    return True
    
def ReadPerson(personAddr):
    key = concat("person_", personAddr)
    v = Get(ctx, key)
    Notify(v)
    
    val = Deserialize(v)
    Notify('company:' + val['company'])
    valList = ['company:' + val['company']]
    return valList

def RegisterCompany(companyAddr, name):
    key = concat('company_', companyAddr)
    Put(ctx, key, name)
    
    return True
    
def RegisterCompanyPerson(companyAddr, personAddr):
    key = concatAll(['company_', companyAddr, '_persons'])
    Notify(key)
    keyM = concatAll(['company_', companyAddr, '_persons_map'])
    Notify(keyM)
    curVal = Get(ctx, keyM)
    curValList = []
    if curVal is not None:
        curValList = Deserialize(curVal)
    
    for i in range(0, len(curValList)):
        if personAddr == curValList[i]:
            Notify('duplicated')
            return True
    
    curValList.append(personAddr)
    val = makeValue(curValList, '$')
    
    Put(ctx, key, val)
    Put(ctx, keyM, Serialize(curValList))
    return True
    
def ReadCompany(companyAddr):
    key = concat("company_", companyAddr)
    v = Get(ctx, key)
    Notify(v)

    return v

def RegisterAuction(personAddr, currentCompanyAddr, start, end):
    val = makeValue([personAddr, currentCompanyAddr, start, end], '$')
    valMap = {
        'person_address': personAddr,
        'current_company_address': currentCompanyAddr,
        'start': start,
        'end': end
    }

    Put(ctx, concat('auction_', personAddr), val)
    Put(ctx, concatAll(['auction_', personAddr, '_map']), Serialize(valMap))
    
    return True

def RegisterBid(personAddr, companyAddr, price):
    # check date 
    auction = Get(ctx, concatAll(['auction_', personAddr, '_map']))
    if auction is not None:
        auction = Deserialize(auction)
    now = GetTime() # TODO
    Notify(now)
    
    # read last bids
    bidsStrKey = concatAll(['bids_', personAddr])
    bidsListKey = concatAll([bidsStrKey, '_list'])
    
    bidsTmp = Get(ctx, bidsListKey)
    bidsList = []
    if bidsTmp is not None:
        bidsList = Deserialize(bidsTmp)
    
    # create value
    bidStr = makeValue([companyAddr, price], '$')
    bidsList.append(bidStr)
    bidsStr = makeValue(bidsList, '#')
    Put(ctx, bidsStrKey, bidsStr)
    Put(ctx, bidsListKey, Serialize(bidsList))
    
    # register highest bid
    curBid = {
            'company_address': companyAddr,
            'price': price
        }
    if (len(bidsList) == 0):
        Put(ctx, concat('highest_bid_', personAddr), Serialize(curBid))
    else:
        highestBid = Get(ctx, concat('highest_bid_', personAddr))
        if highestBid is not None:
            highestBid = Deserialize(highestBid)
            if highestBid['price'] <= price:
                Put(ctx, concat('highest_bid_', personAddr), Serialize(curBid))
        else:
            Put(ctx, concat('highest_bid_', personAddr), Serialize(curBid))
    
    return True

def ReadBids(auctionAddr):
    bids = list()
    # get latest bid index
    idx = Get(ctx, concat('latest_bid_index_', auctionAddr));
    for i in range(0, idx):
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
    
    for i in range(0, idx):
        key = concat(concat('bid_', personAddr), i)
        v = Get(ctx, key)
        if v:
            bids.append(v)
    
    highestBids = getHighestBid(personAddr)

    amount = highestBids['price']
    nextCompanyAddress = highestBids['company_address']
    
    Notify("amount")
    Notify(amount)
    Notify("nextCompanyAddress")
    Notify(nextCompanyAddress)

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
    
    return True


def getHighestBid(personAddr):
    return Get(ctx, concat('highest_bid_',personAddr))
    

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


def concatAll(values):
    val = ''
    for i in range(0, len(values)):
        val = concat(val, values[i])
        
    return val

    
def makeValue(values, divider):
    val = ''
    for i in range(0, len(values)):
        if (i != 0):
            val = concat(val, divider)
        val = concat(val, values[i])
        
    return val