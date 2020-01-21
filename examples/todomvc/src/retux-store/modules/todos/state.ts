import { createTodo, Todo } from '../../../utilities/todo'

export const initialState = [createTodo('Use Redux')] as ReadonlyArray<Todo>

export type State = typeof initialState
