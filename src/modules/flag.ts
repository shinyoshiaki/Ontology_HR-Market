import { Dispatch, Action } from "redux";

export interface FlagState {
  listenSuperChat: boolean;
}

const initialState: FlagState = {
  listenSuperChat: false
};

enum ActionNames {
  SET_VALUE = "flag/set_value"
}

export enum EflagValue {
  listenSuperChat = "listenSuperChat"
}

interface SetValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export function setFlagValue(key: EflagValue, value: any, dispatch: Dispatch<SetValueAction>) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

type FlagActions = SetValueAction;

export default function reducer(state = initialState, action: FlagActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
}
