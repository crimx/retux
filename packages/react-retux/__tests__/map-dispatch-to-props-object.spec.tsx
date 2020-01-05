import React, { FC } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk, { ThunkAction } from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import TestRenderer from 'react-test-renderer'
import { CreateActionCatalog, Action, ActionType } from 'retux'

import { MapDispatchToPropsObject, ExtractDispatchers } from '../src'

describe('MapDispatchToPropsObject', () => {
  it('should correctly map Thunk action creators object to props', () => {
    const actionTypeSpy = jest.fn()
    const actionSpy = jest.fn()

    const initialState = {
      value: 1
    }

    type State = typeof initialState

    type ActionCatalog = CreateActionCatalog<{
      ACTION1: {
        payload: number
      }
      ACTION2: {}
    }>

    type StoreActionType = ActionType<ActionCatalog>

    type StoreAction<T extends StoreActionType = StoreActionType> = Action<
      ActionCatalog,
      T
    >

    type ThunkResult<T extends StoreActionType = StoreActionType> = ThunkAction<
      void,
      State,
      undefined,
      Action<ActionCatalog, T>
    >

    const action1Creator = (payload: number): ThunkResult<'ACTION1'> => (
      dispatch,
      getState
    ) => dispatch({ type: 'ACTION1', payload: payload + getState().value })

    const action2Creator = (): StoreAction<'ACTION2'> => ({
      type: 'ACTION2'
    })

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

    const mapDispatchToProps: MapDispatchToPropsObject<
      StoreAction | ThunkAction<any, State, undefined, StoreAction>,
      TargetProps,
      Dispatchers
    > = {
      takeAction1: action1Creator,
      takeAction2: action2Creator
    }

    const TargetContainer = connect(undefined, mapDispatchToProps)(Target)

    const store = createStore(
      (state: State = initialState, action: StoreAction) => {
        actionTypeSpy(action.type)
        actionSpy(action)

        switch (action.type) {
          case 'ACTION1':
            return { ...state, value: action.payload }
          default:
            return state
        }
      },
      applyMiddleware(thunk)
    )

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

    const initialState = {
      value: 1
    }

    type State = typeof initialState

    type ActionCatalog = CreateActionCatalog<{
      ACTION1: {
        payload: number
      }
      ACTION2: {}
    }>

    type StoreActionType = ActionType<ActionCatalog>

    type StoreAction<T extends StoreActionType = StoreActionType> = Action<
      ActionCatalog,
      T
    >

    const action1Creator = (payload: number): Promise<StoreAction<'ACTION1'>> =>
      Promise.resolve({ type: 'ACTION1', payload })

    const action2Creator = (): StoreAction<'ACTION2'> => ({
      type: 'ACTION2'
    })

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

    const mapDispatchToProps: MapDispatchToPropsObject<
      StoreAction | Promise<StoreAction>,
      TargetProps,
      Dispatchers
    > = {
      takeAction1: action1Creator,
      takeAction2: action2Creator
    }

    const TargetContainer = connect(undefined, mapDispatchToProps)(Target)

    const store = createStore(
      (state: State = initialState, action: StoreAction) => {
        actionTypeSpy(action.type)
        actionSpy(action)

        switch (action.type) {
          case 'ACTION1':
            return { ...state, value: action.payload }
          default:
            return state
        }
      },
      applyMiddleware(promiseMiddleware)
    )

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
