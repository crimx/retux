import React, { FC } from 'react'
import { TodoTextInput } from './TodoTextInput'

export interface HeaderProps {
  addTodo: (text: string) => void
}

export const Header: FC<HeaderProps> = ({ addTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={text => {
        if (text.length !== 0) {
          addTodo(text)
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
)
