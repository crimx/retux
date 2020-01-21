import * as PingPong from './pingpong'
import { ActionType, Action, createReducer } from 'retux'

export type StoreActionCatalog = PingPong.ActionCatalog

export type StoreActionType = ActionType<StoreActionCatalog>

export type StoreAction<T extends StoreActionType = StoreActionType> = Action<
  StoreActionCatalog,
  T
>

export type StoreState = PingPong.State

export const storeActionHandlers = PingPong.actionHandlers

const storeInitState = PingPong.initialState

export const rootReducer = createReducer(storeInitState, storeActionHandlers)
