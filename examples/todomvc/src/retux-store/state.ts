import { Todo, createTodo } from '../utilities/todo'
import { VisibilityFilter } from '../utilities/visibility'

export type State = typeof initialState

export const initialState = {
  todos: [createTodo('Use Redux')] as Todo[],
  visibilityFilter: 'SHOW_ALL' as VisibilityFilter
}
