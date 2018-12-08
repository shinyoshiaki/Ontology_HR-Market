from boa.interop.System.Runtime import Log
from boa.interop.System.Runtime import Notify
from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.interop.System.Runtime import Notify, Serialize, Deserialize
from boa.builtins import concat

ctx = GetContext()

def Main(operation, args):

    if operation == 'RegisterPerson':
        return RegisterPerson(args[0], args[1])
    
    if operation == 'ReadPerson':
        return ReadPerson(args[0])
    
    if operation == 'RegisterCompany':
        return RegisterCompany(args[0], args[1])
        
    if operation == 'ReadCompany':
        return ReadCompany(args[0])
    
    if operation == 'RegisterAuction':
        return RegisterAuction(args[0], args[1], args[2], args[3])
        
    if operation == 'RegisterBid':
        return RegisterBid(args[0], args[1], args[2])
        if operation == 'ReadBids':
        return ReadBids(args[0])
        
    return False
    
def RegisterPerson(personAddr, company):
    Notify(personAddr)
    key = concat("person_", personAddr)
    info = {
        'company': company
    }

    Put(ctx, key, Serialize(info))

    return True

def ReadPerson(personAddr):
    key = concat("person_", personAddr)
    v = Get(ctx, key)
    Notify(v)
    
    info = Deserialize(v)
    Notify('company:' + info['company'])
    infoList = ['company:' + info['company']]
    return infoList

def RegisterCompany(companyAddr, info):
    key = concat("company_", companyAddr)
    Put(ctx, key, info)
    
    return True
    
def ReadCompany(companyAddr):
    key = concat("company_", companyAddr)
    v = Get(ctx, key)
    Notify(v)

    return v

def RegisterAuction(personAddr, currentCompanyAddr, start, end):
    map = {
        "person_address": personAddr,
        "current_company_address": currentCompanyAddr,
        "start": str(start),
        "end": str(end)
    }

    Notify(Serialize(map))
    Put(ctx, concat('auction_', personAddr), Serialize(map))
    
    return True

#def ReadAuction():
#    personAddr = 'aaa'
#    mapInfo = Get(ctx, concat('auction_', personAddr))
    
#    list = ['person_address:' + mapInfo['person_address']]
#    return lest

# def getAuction():
#     mapInfo = Get(ctx, concat('auction_', personAddr))
#     map1 = Deserialize(mapInfo)
#     pA = map1["person_address"]
#     # return map1, wrong
#     cCA = map1["person_address"]
#     # return [pA, cCA] correct
#     list1 = []
#     list1.appen

def RegisterBid(personAddr, companyAddr, price):
    # check date 
    auction = Get(ctx, concat('auction_', personAddr))
    auction = Deserialize(auction)
    now = GetTime() # TODO
    
    # read last index
    idx = Get(ctx, concat('latest_bid_index_', personAddr))
    idx = int(idx, 10)
    idx += 1
    key = concat(concat(concat('bid_', personAddr), '_'), idx)
    
    # create info json
    info = {
        "company_address": companyAddr, # TODO sender?
        "price": price,
        "date": now
    }
    Put(ctx, key, Serialize(info))
    
    # register latest bid index
    Put(ctx, concat('latest_bid_index_', personAddr), idx)
    
    return True
    
def ReadBids(personAddr):
    
    bids = []
    
    # get latest bid index
    idx = Get(ctx, concat('latest_bid_index_', personAddr));
    idx = int(idx, 10)
    Notify(idx)
    for i in range(idx):
        key = concat(concat(concat('bid_', personAddr), '_'), i)
        Notify(key)
        v = Get(ctx, key)
        Notify(v)
        if v is not None:
            bids.append(v)
    
    return bids
