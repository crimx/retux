import React, { FC } from 'react'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import TestRenderer from 'react-test-renderer'

import { MapStateToProps } from '../src'

describe('MapStateToProps', () => {
  it('should correctly map state to props', () => {
    interface TargetProps {
      count: number
    }

    const Target: FC<TargetProps> = ({ count }) => <span>{count}</span>

    const initialState = {
      storeCount: 0
    }

    type State = typeof initialState

    const mapStateToProps: MapStateToProps<State, TargetProps> = state => ({
      count: state.storeCount
    })

    const TargetContainer = connect(mapStateToProps)(Target)

    const store = createStore((state: State = initialState) => state)

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <TargetContainer />
      </Provider>
    )

    const span = renderer.root.findByType('span')

    expect(span.props.children).toBe(initialState.storeCount)
  })
})
