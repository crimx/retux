import { CreateActionCatalog, ActionHandlers } from 'retux'
import { State } from '../state'

export type ActionCatalog = CreateActionCatalog<{
  'TODOS/COMPLETE_ALL': {}
  'TODOS/CLEAR_COMPLETED': {}
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  'TODOS/COMPLETE_ALL': state => {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => ({
      ...todo,
      completed: !areAllMarked
    }))
  },
  'TODOS/CLEAR_COMPLETED': state =>
    state.filter(todo => todo.completed === false)
}
