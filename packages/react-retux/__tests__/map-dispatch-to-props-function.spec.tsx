import React, { FC } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import TestRenderer from 'react-test-renderer'

import { MapDispatchToPropsFunction, ExtractDispatchers } from '../src'

describe('MapDispatchToPropsFunction', () => {
  it('should correctly map Thunk dispatch function to props', () => {
    const actionTypeSpy = jest.fn()
    const actionSpy = jest.fn()

    type Action = { type: 'ACTION1'; payload: number } | { type: 'ACTION2' }

    interface TargetProps {
      takeAction1: (payload: number) => void
      takeAction2: () => void
    }

    type Dispatchers = ExtractDispatchers<
      TargetProps,
      'takeAction1' | 'takeAction2'
    >

    const Target: FC<TargetProps> = ({ takeAction1 }) => (
      <button onClick={() => takeAction1(122)} />
    )

    const initialState = {
      value: 1
    }

    type State = typeof initialState

    const mapDispatchToProps: MapDispatchToPropsFunction<
      ThunkDispatch<State, undefined, Action>,
      TargetProps,
      Dispatchers
    > = dispatch => ({
      takeAction1: payload =>
        dispatch((dispatch, getState) =>
          dispatch({ type: 'ACTION1', payload: payload + getState().value })
        ),
      takeAction2: () => dispatch({ type: 'ACTION2' })
    })

    const TargetContainer = connect(undefined, mapDispatchToProps)(Target)

    const store = createStore((state: State = initialState, action: Action) => {
      actionTypeSpy(action.type)
      actionSpy(action)

      switch (action.type) {
        case 'ACTION1':
          return { ...state, value: action.payload }
        default:
          return state
      }
    }, applyMiddleware(thunk))

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

    expect(actionSpy).toHaveBeenCalledWith({ type: 'ACTION1', payload: 123 })
  })

  it('should correctly map Promise dispatch function to props', async () => {
    const actionTypeSpy = jest.fn()
    const actionSpy = jest.fn()

    type Action = { type: 'ACTION1'; payload: number } | { type: 'ACTION2' }

    interface TargetProps {
      takeAction1: (payload: number) => void
      takeAction2: () => void
    }

    type Dispatchers = ExtractDispatchers<
      TargetProps,
      'takeAction1' | 'takeAction2'
    >

    const Target: FC<TargetProps> = ({ takeAction1 }) => (
      <button onClick={() => takeAction1(122)} />
    )

    const initialState = {
      value: 1
    }

    type State = typeof initialState

    interface PromiseDispatch<Action extends { type: string }> {
      <T extends Action>(action: T): T
      <P extends Promise<Action>>(promise: P): P
    }

    const mapDispatchToProps: MapDispatchToPropsFunction<
      PromiseDispatch<Action>,
      TargetProps,
      Dispatchers
    > = dispatch => ({
      takeAction1: payload => {
        dispatch(Promise.resolve({ type: 'ACTION1', payload } as const))
      },
      takeAction2: () => dispatch({ type: 'ACTION2' })
    })

    const TargetContainer = connect(undefined, mapDispatchToProps)(Target)

    const store = createStore((state: State = initialState, action: Action) => {
      actionTypeSpy(action.type)
      actionSpy(action)

      switch (action.type) {
        case 'ACTION1':
          return { ...state, value: action.payload }
        default:
          return state
      }
    }, applyMiddleware(promiseMiddleware))

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <TargetContainer />
      </Provider>
    )

    const btn = renderer.root.findByType('button')

    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION1')
    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION2')

    await btn.props.onClick('click')

    expect(actionTypeSpy).toHaveBeenCalledWith('ACTION1')
    expect(actionTypeSpy).not.toHaveBeenCalledWith('ACTION2')

    expect(actionSpy).toHaveBeenCalledWith({ type: 'ACTION1', payload: 122 })
  })
})
