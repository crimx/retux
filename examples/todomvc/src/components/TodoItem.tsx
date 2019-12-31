import React, { FC, useState } from 'react'
import classnames from 'classnames'
import { TodoTextInput } from './TodoTextInput'
import { Todo } from '../utilities/todo'

export interface TodoItemProps {
  todo: Todo
  editTodo: (id: string, text: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
}

export const TodoItem: FC<TodoItemProps> = props => {
  const { todo } = props
  const [editing, setEditing] = useState(false)

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing
      })}
    >
      {editing ? (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={text => {
            if (text.length === 0) {
              props.deleteTodo(todo.id)
            } else {
              props.editTodo(todo.id, text)
            }
            setEditing(false)
          }}
        />
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => props.completeTodo(todo.id)}
          />
          <label onDoubleClick={() => setEditing(true)}>{todo.text}</label>
          <button
            className="destroy"
            onClick={() => props.deleteTodo(todo.id)}
          />
        </div>
      )}
    </li>
  )
}
