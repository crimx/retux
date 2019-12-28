import React, { FC } from 'react'
import { FilterLink } from '../containers/FilterLink'

export const Footer: FC = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter="SHOW_ALL">All</FilterLink>
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </div>
)
