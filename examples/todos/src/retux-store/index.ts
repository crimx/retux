import { combineReducers, createStore as createReduxStore } from 'redux'
import { createReducer, Action } from 'retux'
import * as Todos from './modules/todos'
import * as VisibilityFilter from './modules/visibilityFilter'

export type StoreAction =
  | Action<Todos.ActionCatalog>
  | Action<VisibilityFilter.ActionCatalog>

export type StoreState = Readonly<{
  todos: Todos.State
  visibilityFilter: VisibilityFilter.State
}>

/** Redux store setup */
export const createStore = () =>
  createReduxStore(
    combineReducers({
      todos: createReducer(Todos.initState, Todos.actionHandlers),
      visibilityFilter: createReducer(
        VisibilityFilter.initState,
        VisibilityFilter.actionHandlers
      )
    })
  )
