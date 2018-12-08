from boa.interop.System.Runtime import Log
from boa.interop.System.Runtime import Notify
from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.builtins import concat

ctx = GetContext()

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
    Put(ct, key, info)
    
    return True
    
def ReadCompany(companyAddr):
    key = concat("company_", companyAddr)
    v = Get(ctx, key)
    Notify(v)

    return v
    
def RegisterBid(personAddr, companyAddr, price):
    # check date
    
    # check auction
    if true:
        # exit
    else:
        # create auction

#    # generate random
#    key = ''
    # read last index
    idx = 0
    idx = idx + 1
    key = concat(concat(concat('bid_', personAddr), '_'), idx)
    
    # create info json
    info = ''
    Put(ctx, key, info)
    
    # register latest bid index
    Put(ctx, concat('latest_bid_index_', personAddr), idx)
    
    return True
    
def ReadBids(personAddr):
    
    bids = []
    
    # get latest bid index
    idx = Get(ctx, concat('latest_bid_index_', personAddr));
    for i in range(idx):
        key = concat(concat('bid_', personAddr), i)
        v = Get(ctx, key)
        if !v:
            bids.append(v)
    bidsJson = json.Serialize(bids)
    
    
    return bidsJson
    
def CloseAuction(personAddr):
    # get auction entity

    # get next company address    
    # check amount of next company address
    
    # get current company address
    # transfer
    
    # change company
    
