import { createTodo, Todo } from '../../../utilities/todo'

export type State = typeof state

export const state = [createTodo('Use Redux')] as Todo[]
