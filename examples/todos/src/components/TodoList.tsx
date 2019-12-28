import React, { FC } from 'react'
import { Todo } from './Todo'

export interface TodoListProps {
  todos: Array<{ id: string; text: string; completed: boolean }>
  toggleTodo: (id: string) => void
}

export const TodoList: FC<TodoListProps> = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)
