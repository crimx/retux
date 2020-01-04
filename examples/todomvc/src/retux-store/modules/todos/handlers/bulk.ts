import { CreateActionCatalog, ActionHandlers } from 'retux'
import { State } from '../state'

export type ActionCatalog = CreateActionCatalog<{
  TodosCompleteAll: {}
  TodosClearCompleted: {}
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  TodosCompleteAll: state => {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => ({
      ...todo,
      completed: !areAllMarked
    }))
  },
  TodosClearCompleted: state => state.filter(todo => todo.completed === false)
}
