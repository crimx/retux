import { combineReducers, createStore as createReduxStore } from 'redux'
import { createReducer, Action, ActionType } from 'retux'
import {
  state as todosState,
  actionHandlers as todosHandlers,
  ActionCatalog as TodosActionCatalog
} from './modules/todos'
import {
  state as visibilityFilterState,
  actionHandlers as visibilityFilterHandlers,
  ActionCatalog as VisibilityFilterActionCatalog
} from './modules/visibilityFilter'

export type StoreActionCatalog = TodosActionCatalog &
  VisibilityFilterActionCatalog

// These are just helpers. You can also just pass `StoreActionCatalog` around.
export type StoreActionType = ActionType<StoreActionCatalog>
export type StoreAction<T extends StoreActionType = StoreActionType> = Action<
  StoreActionCatalog,
  T
>

export type StoreState = {
  todos: typeof todosState
  visibilityFilter: typeof visibilityFilterState
}

/** Redux store setup */
export const createStore = () =>
  createReduxStore(
    combineReducers({
      todos: createReducer(todosState, todosHandlers),
      visibilityFilter: createReducer(
        visibilityFilterState,
        visibilityFilterHandlers
      )
    })
  )
