import React, { FC } from 'react'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import TestRenderer from 'react-test-renderer'

import { MapDispatchToProps, ExtractDispatchers } from '../src'

describe('MapDispatchToProps', () => {
  type Action = { type: 'ACTION1'; payload: number } | { type: 'ACTION2' }

  interface TargetProps {
    takeAction1: (payload: number) => void
  }

  type Dispatchers = ExtractDispatchers<TargetProps, 'takeAction1'>

  const Target: FC<TargetProps> = ({ takeAction1 }) => (
    <button onClick={() => takeAction1(122)} />
  )

  it('should correctly map dispatch function to props', () => {
    const actionTypeSpy = jest.fn()
    const actionSpy = jest.fn()

    const mapDispatchToProps: MapDispatchToProps<
      Action,
      TargetProps,
      Dispatchers
    > = dispatch => ({
      takeAction1: payload => dispatch({ type: 'ACTION1', payload })
    })

    const TargetContainer = connect(undefined, mapDispatchToProps)(Target)

    const store = createStore((state: undefined, action: Action) => {
      actionTypeSpy(action.type)
      actionSpy(action)
      return state
    })

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <TargetContainer />
      </Provider>
    )

    const btn = renderer.root.findByType('button')

    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION1')
    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION2')

    btn.props.onClick('click')

    expect(actionTypeSpy).toHaveBeenCalledWith('ACTION1')
    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION2')

    expect(actionSpy).toHaveBeenCalledWith({ type: 'ACTION1', payload: 122 })
  })

  it('should correctly map action creators object to props', () => {
    const actionTypeSpy = jest.fn()
    const actionSpy = jest.fn()

    const action1Creator = (payload: number) =>
      ({ type: 'ACTION1', payload: 122 } as const)

    const mapDispatchToProps: MapDispatchToProps<
      Action,
      TargetProps,
      Dispatchers
    > = {
      takeAction1: action1Creator
    }

    const TargetContainer = connect(undefined, mapDispatchToProps)(Target)

    const store = createStore((state: undefined, action: Action) => {
      actionTypeSpy(action.type)
      actionSpy(action)
      return state
    })

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <TargetContainer />
      </Provider>
    )

    const btn = renderer.root.findByType('button')

    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION1')
    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION2')

    btn.props.onClick('click')

    expect(actionTypeSpy).toHaveBeenCalledWith('ACTION1')
    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION2')

    expect(actionSpy).toHaveBeenCalledWith({ type: 'ACTION1', payload: 122 })
  })
})
