from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.interop.System.Runtime import Notify, Serialize, Deserialize, GetTime, Notify, Log
from boa.builtins import concat
from boa.interop.Ontology.Native import Invoke

MESIToken = RegisterAppCall('d92a87ee43c7dd227b327c06d0f1ba1555d1a4d3', 'operation', 'args')

ctx = GetContext()
contractAddress = bytearray(b'\xd3\xa4\xd1\x55\x15\xba\xf1\xd0\x06\x7c\x32\x7b\x22\xdd\xc7\x43\xee\x87\x2a\xd9')


NAME = 'MESItoken'
SYMBOL = 'MST'
DECIMAL = 8
FACTOR = 100000000
OWNER = ToScriptHash("Ad7PyMYUYx5GdpvC9Sw3tK674hHrTRPT5C")
TOTAL_AMOUNT = 1000000000

TRANSFER_PREFIX = bytearray(b'\x01')
APPROVE_PREFIX = bytearray(b'\x02 ')

SUPPLY_KEY = 'totoalSupply'


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


    if operation == 'name':
        return Name()
    if operation == 'totalSupply':
        return TotalSupply()
    if operation == 'init':
        return init()
    if operation == 'symbol':
        return Symbol()
    if operation == 'transfer':
        if len(args) != 3:
            return False
        else:
            from_acct = args[0]
            to_acct = args[1]
            amount = args[2]
            return transfer(from_acct, to_acct, amount)
    if operation == 'transferMulti':
        return TransferMulti(args)
    if operation == 'approve':
        if len(args) != 3:
            return False
        owner = args[0]
        spender = args[1]
        amount = args[2]
        return Approve(owner, spender, amount)
    if operation == 'transferFrom':
        if len(args) != 4:
            return False
        spender = args[0]
        from_acct = args[1]
        to_acct = args[2]
        amount = args[3]
        return TransferFrom(spender, from_acct, to_acct, amount)
    if operation == 'balanceOf':
        if len(args) != 1:
            return False
        acct = args[0]
        return balanceOf(acct)
    if operation == 'decimal':
        return Decimal()
    if operation == 'allowance':
        if len(args) != 2:
            return False
        owner = args[0]
        spender = args[1]
        return Allowance(owner, spender)

    return False


def RegisterPerson(personAddr, name, company):
    key = concat("person_", personAddr)
    val = makeValue([name, company], '$')
    
    person = {'name':name,'company':company}
    Put(ctx,concat(key,'_map'),Serialize(person))

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
    
    # company address
    person = Deserialize(Get(ctx,concatAll(['person_',personAddr,'_map'])))
    person["company_address"] = companyAddr
    Put(ctx,concatAll(['person_',personAddr,'_map']),Serialize(person))
    
    Put(ctx, key, val)
    Put(ctx, keyM, Serialize(curValList))
    Put(ctx,concat("person_", personAddr),companyAddr)
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
    person = Get(ctx,concatAll(["person_", personAddr,'_map']))
    personData = Deserialize(person)
    currentCompanyAddress = personData['company_address']
        
    # transfer
    transfer(nextCompanyAddress, currentCompanyAddress, amount)
       
    # change company
    personData['company'] = nextCompanyAddress
    RegisterPerson(personAddr, personData)
    
    return True


def getHighestBid(personAddr):
    return Deserialize(Get(ctx, concat('highest_bid_',personAddr)))
    



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
    
    

def Symbol():
    return SYMBOL


def Name():
    return NAME


def Decimal():
    return DECIMAL


def TotalSupply():
    return TOTAL_AMOUNT * FACTOR


def init():
    if Get(ctx, SUPPLY_KEY):
        Notify('Already initialized!')
        return False
    else:
        total = TOTAL_AMOUNT * FACTOR
        Put(ctx, SUPPLY_KEY, total)
        Put(ctx, concat(TRANSFER_PREFIX, OWNER), total)
        Notify(['transfer', '', OWNER, total])
        return True


def transfer(from_acct, to_acct, amount):
    if from_acct == to_acct:
        return True
    if amount == 0:
        return True
    if amount < 0:
        return False
#    if CheckWitness(from_acct) == False:
#        return False
    fromKey = concat(TRANSFER_PREFIX, from_acct)
    fromBalance = Get(ctx, fromKey)
    if fromBalance < amount:
        return False
    if fromBalance == amount:
        Delete(ctx, fromKey)
    else:
        Put(ctx, fromKey, fromBalance - amount)

    tokey = concat(TRANSFER_PREFIX, to_acct)
    toBalance = Get(ctx, tokey)

    Put(ctx, tokey, toBalance + amount)
    Notify(['transfer', from_acct, to_acct, amount])
    return True


def TransferMulti(args):
    for p in (args):
        if len(p) != 3:
            return False
        if transfer(p[0], p[1], p[2]) == False:
            # return False #  wrong since the previous transaction will be successful
            raise Exception("TransferMulti failed.")
    return True


def Approve(owner, spender, amount):
    if amount < 0:
        return False
    if CheckWitness(owner) == False:
        return False
    if len(spender) != 20:
        return False
    key = concat(concat(APPROVE_PREFIX, owner), spender)
    Put(ctx, key, amount)
    Notify(['approve', owner, spender, amount])
    return True


def TransferFrom(sender, from_acct, to_acct, amount):
    if amount < 0:
        return False
    if CheckWitness(sender) == False:
        return False
    if len(to_acct) != 20:
        return False
    appoveKey = concat(concat(APPROVE_PREFIX, from_acct), sender)
    approvedAmount = Get(ctx, appoveKey)
    if approvedAmount < amount:
        return False
    if approvedAmount == amount:
        Delete(ctx, appoveKey)
    else:
        Put(ctx, appoveKey, approvedAmount - amount)

    fromKey = concat(TRANSFER_PREFIX, from_acct)
    fromBalance = Get(ctx, fromKey)
    if fromBalance < amount:
        return False
    if fromBalance == amount:
        Delete(ctx, fromKey)
    else:
        Put(ctx, fromKey, fromBalance - amount)

    tokey = concat(TRANSFER_PREFIX, to_acct)
    toBalance = Get(ctx, tokey)

    Put(ctx, tokey, toBalance + amount)
    Notify(['transfer', from_acct, to_acct, amount])
    return True


def balanceOf(account):
    return Get(ctx, concat(TRANSFER_PREFIX, account))


def Allowance(owner, spender):
    allowanceKey = concat(concat(APPROVE_PREFIX, owner), spender)
    return Get(ctx, allowanceKey)
