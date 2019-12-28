import React, { FC } from 'react'

export interface LinkProps {
  active: boolean
  onClick: () => void
}

export const Link: FC<LinkProps> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </button>
)
