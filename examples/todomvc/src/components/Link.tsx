import React, { FC } from 'react'
import classnames from 'classnames'

export interface LinkProps {
  active: boolean
  setFilter: () => void
}

export const Link: FC<LinkProps> = ({ active, children, setFilter }) => (
  <a
    href="#foo"
    className={classnames({ selected: active })}
    onClick={e => {
      e.preventDefault()
      setFilter()
    }}
  >
    {children}
  </a>
)
