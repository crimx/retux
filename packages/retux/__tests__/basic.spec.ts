import {
  createReducer,
  CreateActionCatalog,
  ActionHandlers
} from '../src/basic'
import { createStore } from 'redux'

describe('basic', () => {
  it('createReducer', () => {
    const initState = {
      count: 0
    }

    type CounterState = typeof initState

    type CounterActionCatalog = CreateActionCatalog<{
      INCREMENT: {
        // optional increment step
        payload?: number
      }
      DECREMENT: {
        // optional decrement step
        payload?: number
      }
    }>

    const counterActionCatalog: ActionHandlers<
      CounterState,
      CounterActionCatalog
    > = {
      INCREMENT: (state, { payload }) => ({
        count: state.count + (payload == null ? 1 : payload)
      }),
      DECREMENT: (state, { payload }) => ({
        count: state.count - (payload == null ? 1 : payload)
      })
    }

    const store = createStore(createReducer(initState, counterActionCatalog))

    expect(store.getState()).toEqual({ count: 0 })

    store.dispatch({ type: 'INCREMENT' })
    expect(store.getState()).toEqual({ count: 1 })

    store.dispatch({ type: 'INCREMENT', payload: 2 })
    expect(store.getState()).toEqual({ count: 3 })

    store.dispatch({ type: 'DECREMENT', payload: 2 })
    expect(store.getState()).toEqual({ count: 1 })
  })
})
