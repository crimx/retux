import { combineReducers } from 'redux'
import { createReducer, Action, ActionType } from 'retux'
import * as Todos from './todos'
import * as VisibilityFilter from './visibilityFilter'

export type StoreActionCatalog = Todos.ActionCatalog &
  VisibilityFilter.ActionCatalog

export type StoreActionType = ActionType<StoreActionCatalog>

export type StoreAction<T extends StoreActionType = StoreActionType> = Action<
  StoreActionCatalog,
  T
>

export type StoreState = {
  todos: Todos.State
  visibilityFilter: VisibilityFilter.State
}

export const rootReducer = combineReducers({
  todos: createReducer(Todos.initialState, Todos.actionHandlers),
  visibilityFilter: createReducer(
    VisibilityFilter.initialState,
    VisibilityFilter.actionHandlers
  )
})
