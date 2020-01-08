import { createReducer, Action, ActionType } from 'retux'
import {
  createStore as createReduxStore,
  applyMiddleware,
  compose
} from 'redux'
import {
  CounterActionCatalog,
  CounterState,
  counterState,
  counterActionHandlers
} from './modules/counter'
import thunk, {
  ThunkAction as CreateThunkAction,
  ThunkDispatch as CreateThunkDispatch
} from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

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

export type ThunkDispatch<
  Type extends StoreActionType = StoreActionType
> = CreateThunkDispatch<StoreState, ThunkExtraArgs, StoreAction<Type>>

/// Custom Dispatch

export interface StoreDispatch<Type extends StoreActionType = StoreActionType> {
  <T extends StoreAction>(action: T): T
  <P extends Promise<StoreAction<Type>>>(promiseAction: P): P
  <R>(thunkAction: ThunkActionWithPromise<Type, R>): R
}

/// Redux Thunk with Redux Promise

export type ThunkActionWithPromise<
  Type extends StoreActionType = StoreActionType,
  Result = void
> = (
  dispatch: StoreDispatch<Type>,
  getState: () => StoreState,
  extraArgument: ThunkExtraArgs
) => Result

/// redux-devtools-extension

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/** Redux store setup */
export const createStore = () =>
  createReduxStore(
    createReducer(storeState, storeActionHandlers),
    composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument(thunkExtraArgs),
        promiseMiddleware
      )
    )
  )
