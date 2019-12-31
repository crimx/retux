import { getRandomId } from './random-id'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

export function createTodo(text: string): Todo {
  return {
    id: getRandomId(),
    text,
    completed: false
  }
}
