import { CreateActionCatalog, ActionHandlers } from 'retux'
import { State } from '../state'
import { createTodo } from '../../../../utilities/todo'

export type ActionCatalog = CreateActionCatalog<{
  TodosAdd: {
    /** todo text */
    payload: string
  }
  TodosEdit: {
    payload: {
      id: string
      text: string
    }
  }
  TodosComplete: {
    /** todo item id */
    payload: string
  }
  TodosDelete: {
    /** todo item id */
    payload: string
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  TodosAdd: (state, { payload: text }) => [...state, createTodo(text)],
  TodosEdit: (state, { payload: { id, text } }) =>
    state.map(todo => (todo.id === id ? { ...todo, text } : todo)),
  TodosComplete: (state, { payload: id }) =>
    state.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  TodosDelete: (state, { payload: id }) => state.filter(todo => todo.id !== id)
}
