import {
  createStore as createReduxStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { rootReducer, thunkExtraArgs } from './modules'

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
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument(thunkExtraArgs),
        promiseMiddleware
      )
    )
  )
