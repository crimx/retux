import React, { FC, useState, useEffect } from 'react'
import classnames from 'classnames'

export interface TodoTextInputProps {
  onSave: (text: string) => void
  text?: string
  placeholder?: string
  editing?: boolean
  newTodo?: boolean
}

export const TodoTextInput: FC<TodoTextInputProps> = props => {
  const [text, setText] = useState(props.text || '')
  useEffect(() => {
    setText(props.text || '')
  }, [props.text])

  return (
    <input
      className={classnames({
        edit: props.editing,
        'new-todo': props.newTodo
      })}
      type="text"
      placeholder={props.placeholder}
      autoFocus={true}
      value={text}
      onChange={e => setText(e.target.value)}
      onBlur={e => {
        if (!props.newTodo) {
          props.onSave(e.target.value)
        }
      }}
      onKeyDown={e => {
        if (e.which === 13) {
          props.onSave((e.target as HTMLInputElement).value.trim())
          if (props.newTodo) {
            setText('')
          }
        }
      }}
    />
  )
}
