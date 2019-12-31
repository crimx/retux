import React, { FC } from 'react'
import { Footer } from './Footer'
import { VisibleTodoList } from '../containers/VisibleTodoList'

export interface MainSectionProps {
  todosCount: number
  completedCount: number
  completeAllTodos: () => void
  clearCompleted: () => void
}

export const MainSection: FC<MainSectionProps> = ({
  todosCount,
  completedCount,
  completeAllTodos,
  clearCompleted
}) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
          readOnly
        />
        <label onClick={completeAllTodos} />
      </span>
    )}
    <VisibleTodoList />
    {todosCount > 0 && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={clearCompleted}
      />
    )}
  </section>
)
