from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.interop.System.Runtime import Notify, Serialize, Deserialize, GetTime, Notify, Log
from boa.builtins import concat

ctx = GetContext()

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
        
    return False


def RegisterPerson(personAddr, name, company):
    key = concat("person_", personAddr)
    val = makeValue([name, company])

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
    val = makeValue(curValList)
    
    Put(ctx, key, val)
    Put(ctx, keyM, Serialize(curValList))
    return True
    
def ReadCompany(companyAddr):
    key = concat("company_", companyAddr)
    v = Get(ctx, key)
    Notify(v)

    return v

def RegisterAuction(personAddr, currentCompanyAddr, start, end):
    val = makeValue([personAddr, currentCompanyAddr, start, end])
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
    auction = Deserialize(auction)
    now = GetTime() # TODO
    Notify(now)
    
    # read last bid index
    idx = Get(ctx, concat('latest_bid_index_', personAddr))
    idx += 1
    key = concatAll(['bid_', personAddr, '_', idx])
    
    # create value
    val = makeValue([companyAddr, price, now])
    Put(ctx, key, val)
    
    # register latest bid index
    Put(ctx, concat('latest_bid_index_', personAddr), idx)
    
    return True
    
def ReadBids(personAddr):
    
    bids = []
    
    # get latest bid index
    idx = Get(ctx, concat('latest_bid_index_', personAddr));
    Notify(idx)
    for i in range(idx):
        key = concatAll(['bid_', personAddr, '_', i])
        Notify(key)
        v = Get(ctx, key)
        Notify(v)
        if v is not None:
            bids.append(v)
    
    return bids

def concatAll(values):
    val = ''
    for i in range(0, len(values)):
        val = concat(val, values[i])
        
    return val
    
def makeValue(values):
    val = ''
    for i in range(0, len(values)):
        if (i != 0):
            val = concat(val, '$')
        val = concat(val, values[i])
        
    return val
