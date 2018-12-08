import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";

import wallet, { Walletstate } from "./modules/wallet";
import flag, { FlagState } from "./modules/flag";
import contract, { ContractState } from "./modules/contract";

const history = createHistory();
const middleware = routerMiddleware(history);

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({ wallet, router: routerReducer, flag, contract }),
    applyMiddleware(thunk, logger, middleware)
  );
  return { store, history };
}

export interface ReduxState {
  wallet: Walletstate;
  flag: FlagState;
  contract: ContractState;
}
