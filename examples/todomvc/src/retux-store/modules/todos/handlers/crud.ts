import { CreateActionCatalog, ActionHandlers } from 'retux'
import { State } from '../state'
import { createTodo } from '../../../../utilities/todo'

export type ActionCatalog = CreateActionCatalog<{
  'TODOS/ADD': {
    /** todo text */
    payload: string
  }
  'TODOS/EDIT': {
    payload: {
      id: string
      text: string
    }
  }
  'TODOS/COMPLETE': {
    /** todo item id */
    payload: string
  }
  'TODOS/DELETE': {
    /** todo item id */
    payload: string
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  'TODOS/ADD': (state, { payload: text }) => [...state, createTodo(text)],
  'TODOS/EDIT': (state, { payload: { id, text } }) =>
    state.map(todo => (todo.id === id ? { ...todo, text } : todo)),
  'TODOS/COMPLETE': (state, { payload: id }) =>
    state.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  'TODOS/DELETE': (state, { payload: id }) =>
    state.filter(todo => todo.id !== id)
}
