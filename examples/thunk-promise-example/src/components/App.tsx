import React from 'react'
import CounterMapDispatchToPropsObject from '../containers/CounterMapDispatchToPropsObject'
import CounterMapDispatchToPropsFunction from '../containers/CounterMapDispatchToPropsFunction'

export const App = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <CounterMapDispatchToPropsObject />
    <CounterMapDispatchToPropsFunction />
  </div>
)
