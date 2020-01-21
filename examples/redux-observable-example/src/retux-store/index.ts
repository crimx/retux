import { applyMiddleware, createStore as createReduxStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { StoreAction, StoreState, rootReducer } from './modules'
import { rootEpic } from './epics'

/** Redux store setup */
export const createStore = () => {
  const epicMiddleware = createEpicMiddleware<
    StoreAction,
    StoreAction,
    StoreState
  >()

  const store = createReduxStore(rootReducer, applyMiddleware(epicMiddleware))

  epicMiddleware.run(rootEpic)

  return store
}
