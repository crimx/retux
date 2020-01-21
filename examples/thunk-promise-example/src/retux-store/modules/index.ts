import { createReducer, Action, ActionType } from 'retux'
import { ThunkAction as CreateThunkAction } from 'redux-thunk'
import {
  CounterActionCatalog,
  CounterState,
  counterState,
  counterActionHandlers
} from './counter'

export type StoreActionCatalog = CounterActionCatalog

export type StoreState = Readonly<CounterState>

export type StoreActionType = ActionType<StoreActionCatalog>

export type StoreAction<T extends StoreActionType = StoreActionType> = Action<
  StoreActionCatalog,
  T
>

export const storeActionHandlers = counterActionHandlers

export const storeState: StoreState = counterState

/// Redux Thunk

export const thunkExtraArgs = {
  env: 'xxxx'
}

export type ThunkExtraArgs = typeof thunkExtraArgs

export type ThunkAction<
  Type extends StoreActionType = StoreActionType,
  Result = void
> = CreateThunkAction<
  Result,
  StoreState,
  ThunkExtraArgs,
  Action<StoreActionCatalog, Type>
>

/// Redux Promise

export type PromiseAction<
  Type extends StoreActionType = StoreActionType
> = Promise<StoreAction<Type>>

/// Redux Thunk with Redux Promise

export interface StoreDispatch<Type extends StoreActionType = StoreActionType> {
  <T extends StoreAction>(action: T): T
  <P extends PromiseAction<Type>>(promiseAction: P): P
  <R>(thunkAction: ThunkActionWithPromise<Type, R>): R
}

export type ThunkActionWithPromise<
  Type extends StoreActionType = StoreActionType,
  Result = void
> = (
  dispatch: StoreDispatch<Type>,
  getState: () => StoreState,
  extraArgument: ThunkExtraArgs
) => Result

export const rootReducer = createReducer(storeState, storeActionHandlers)
