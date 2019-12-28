import React, { FC } from 'react'

export interface TodoProps {
  text: string
  completed: boolean
  onClick: () => void
}

export const Todo: FC<TodoProps> = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)
