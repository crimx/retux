import React, { FC } from 'react'
import FilterLink from '../containers/FilterLink'
import { visibilityFilterTitles } from '../utilities/visibility'

export interface FooterProps {
  completedCount: number
  activeCount: number
  onClearCompleted: () => void
}

export const Footer: FC<FooterProps> = props => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{props.activeCount || 'No'}</strong>{' '}
      {props.activeCount === 1 ? 'item' : 'items'} left
    </span>
    <ul className="filters">
      {visibilityFilterTitles.map(({ key, title }) => (
        <li key={key}>
          <FilterLink filter={key}>{title}</FilterLink>
        </li>
      ))}
    </ul>
    {!!props.completedCount && (
      <button className="clear-completed" onClick={props.onClearCompleted}>
        Clear completed
      </button>
    )}
  </footer>
)
