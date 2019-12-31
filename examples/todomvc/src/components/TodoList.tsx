import React, { FC } from 'react'
import { TodoItem, TodoItemProps } from './TodoItem'
import { Todo } from '../utilities/todo'

export interface TodoListProp extends Omit<TodoItemProps, 'todo'> {
  filteredTodos: Todo[]
}

export const TodoList: FC<TodoListProp> = props => {
  const { filteredTodos, ...restProps } = props
  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...restProps} />
      ))}
    </ul>
  )
}
