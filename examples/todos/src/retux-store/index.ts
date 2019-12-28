import { combineReducers, createStore as createReduxStore } from 'redux'
import { createReducer, Action } from 'retux'
import {
  state as todosState,
  actionHandlers as todosHandler,
  ActionCatalog as todosActionCatalog
} from './modules/todos'
import {
  state as visibilityFilterState,
  actionHandlers as visibilityFilterHandler,
  ActionCatalog as visibilityFilterActionCatalog
} from './modules/visibilityFilter'

export type StoreAction =
  | Action<todosActionCatalog>
  | Action<visibilityFilterActionCatalog>

export type StoreState = {
  todos: typeof todosState
  visibilityFilter: typeof visibilityFilterState
}

/** Redux store setup */
export const createStore = () =>
  createReduxStore(
    combineReducers({
      todos: createReducer(todosState, todosHandler),
      visibilityFilter: createReducer(
        visibilityFilterState,
        visibilityFilterHandler
      )
    })
  )
