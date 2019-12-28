import React, { FC, useRef } from 'react'
import { connect } from 'react-redux'
import { StoreAction } from '../retux-store'
import { Dispatch } from 'redux'

export interface AddTodoProps {
  dispatch: Dispatch<StoreAction>
}

/**
 * Putting UI implementation into containers is not encouraged by Retux.
 * This is just for demonstrating the Redux example.
 */
const AddTodoInner: FC<AddTodoProps> = ({ dispatch }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (inputRef.current) {
            const text = inputRef.current.value.trim()
            if (text) {
              dispatch({ type: 'TODOS/ADD', payload: text })
              inputRef.current.value = ''
            }
          }
        }}
      >
        <input ref={inputRef} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export const AddTodo = connect()(AddTodoInner)
