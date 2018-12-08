import { RestClient, AbiInfo, Parameter, ParameterType } from "ontology-ts-sdk";
import { Dispatch, Action } from "redux";
import { CommentData } from "../components/molecules/listComment";
import * as json from "./helloworld.abi.json";
import { address2scriptHash, onScCall } from "./wallet";
import { client } from "ontology-dapi";
import Node from "kad-rtc/lib/node/node";
import Kademlia from "kad-rtc";
import sha1 from "sha1";

const rest = new RestClient("http://polaris1.ont.io:20334");
const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
const codeHash = abiInfo.getHash().replace("0x", "");
const kad: Kademlia = new Node({ address: "35.231.49.162", port: "20000" }).kad;

export interface Chatstate {
  comments: CommentData[];
  superChats: CommentData[];
}

const initialState: Chatstate = {
  comments: [],
  superChats: []
};

enum ActionNames {
  SET_VALUE = "chat/set_value",
  ADD_COMMENT = "chat/addcomment",
  UPDATE_COMMENT = "chat/updatecomment"
}

interface SetChatValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export enum EchatValue {
  comments = "comments",
  superChats = "superChats"
}

export function setChatValue(key: EchatValue, value: any, dispatch: Dispatch<SetChatValueAction>) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

export function strJson(obj: object) {
  const objString = JSON.stringify(obj, Object.keys(obj).sort());
  return objString;
}

export async function listenKadComment(targetAddress: string, dispatch: Dispatch<UpdateCommentAction>) {
  let commentLocal = {};
  setInterval(async () => {
    const result = await kad.findValue(sha1(targetAddress));
    if (result) {
      if (result.type === "comment") {
        const comment: CommentData = result.comment;
        if (strJson(comment) !== strJson(commentLocal)) {
          updateComment([comment], dispatch);
          commentLocal = comment;
        }
      }
    }
  }, 1000);
}

export async function listenComment(targetAddress: string, dispatch: Dispatch<UpdateCommentAction>) {
  const address = address2scriptHash(targetAddress) + Buffer.from(":list", "ascii").toString("hex");
  let commentsLocal: CommentData[] = [];
  setInterval(async () => {
    const comments: CommentData[] = [];
    const result = await rest.getStorage(codeHash, address).catch(console.log);
    if (result) {
      const users: string[] = Array.from(new Set(result.Result.split("25")));
      for (const user of users) {
        const url = address2scriptHash(targetAddress) + user;
        const raw = await rest.getStorage(codeHash, url).catch(console.log);
        const commentsJson = Buffer.from(raw.Result, "hex")
          .toString("ascii")
          .split("%");
        commentsJson.forEach(data => {
          try {
            comments.push(JSON.parse(data));
          } catch (error) {}
        });
      }

      if (commentsLocal.length !== comments.length) {
        const arr = comments
          .map(comment => {
            let ans: CommentData | undefined = comment;
            commentsLocal.forEach(v => {
              if (strJson(comment) === strJson(v)) ans = undefined;
            });
            return ans;
          })
          .filter(v => v);
        updateComment(arr, dispatch);
        commentsLocal = comments;
      }
    }
  }, 5000);
}

export async function listenSuperChats(dispatch: Dispatch<SetChatValueAction>) {
  const myAddress = await client.api.asset.getAccount();
  const address = address2scriptHash(myAddress) + Buffer.from(":list", "ascii").toString("hex");
  let commentsLocal: CommentData[] = [];
  setInterval(async () => {
    const comments: CommentData[] = [];
    const result = await rest.getStorage(codeHash, address).catch(console.log);
    if (result) {
      const users: string[] = Array.from(new Set(result.Result.split("25")));
      for (const user of users) {
        const url = address2scriptHash(myAddress) + user;
        const raw = await rest.getStorage(codeHash, url).catch(console.log);
        const commentsJson = Buffer.from(raw.Result, "hex")
          .toString("ascii")
          .split("%");
        commentsJson.forEach(data => {
          try {
            comments.push(JSON.parse(data));
          } catch (error) {}
        });
      }

      if (commentsLocal.length !== comments.length) {
        setChatValue(
          EchatValue.superChats,
          comments.slice().sort((a: CommentData, b: CommentData) => a.timestamp - b.timestamp),
          dispatch
        );
        commentsLocal = comments;
      }
    }
  }, 5000);
}

export async function superChat(target: string, msg: string, amout: number, dispatch: Dispatch<AddCommentAction>) {
  const address = await client.api.asset.getAccount();
  console.log("superchat");
  const abiFunction = abiInfo.getFunction("tip");

  const comment: CommentData = {
    id: address,
    msg,
    money: amout,
    timestamp: Date.now()
  };

  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.ByteArray, address2scriptHash(address)),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.ByteArray, address2scriptHash(target)),
    new Parameter(abiFunction.parameters[2].getName(), ParameterType.Integer, amout),
    new Parameter(abiFunction.parameters[3].getName(), ParameterType.String, JSON.stringify(comment))
  );

  await onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  }).catch(console.log);
}

export interface AddCommentAction extends Action {
  type: ActionNames.ADD_COMMENT;
  comment: CommentData;
}

export function addComment(targetAddress: string, comment: CommentData, dispatch: Dispatch<AddCommentAction>) {
  // dispatch({ type: ActionNames.ADD_COMMENT, comment });
  kad.store(kad.nodeId, sha1(targetAddress), { type: "comment", comment });
}

export interface UpdateCommentAction extends Action {
  type: ActionNames.UPDATE_COMMENT;
  comments: CommentData[];
}

export function updateComment(comments: CommentData[], dispatch: Dispatch<UpdateCommentAction>) {
  dispatch({ type: ActionNames.UPDATE_COMMENT, comments });
}

type ChatActions = SetChatValueAction | AddCommentAction | UpdateCommentAction;

export default function reducer(state = initialState, action: ChatActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };
    case ActionNames.ADD_COMMENT:
      return { ...state, comments: state.comments.concat(action.comment) };
    case ActionNames.UPDATE_COMMENT:
      const arr = state.comments
        .concat(action.comments)
        .sort((a: CommentData, b: CommentData) => a.timestamp - b.timestamp);
      return { ...state, comments: arr };
    default:
      return state;
  }
}
