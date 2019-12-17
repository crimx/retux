import { createReducer, ActionCatalog, ActionHandlers } from '../src/fsa'
import { createStore } from 'redux'

describe('fsa', () => {
  it('createReducer', () => {
    const initState = {
      count: 0
    }

    type CounterState = typeof initState

    type CounterActionCatalog = ActionCatalog<{
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
      INCREMENT: (state, action) =>
        action.error
          ? state
          : {
              count: state.count + (action.payload == null ? 1 : action.payload)
            },
      DECREMENT: (state, action) =>
        action.error
          ? state
          : {
              count: state.count - (action.payload == null ? 1 : action.payload)
            }
    }

    const store = createStore(createReducer(initState, counterActionCatalog))

    expect(store.getState()).toEqual({ count: 0 })

    store.dispatch({ type: 'INCREMENT' })
    expect(store.getState()).toEqual({ count: 1 })

    store.dispatch({ type: 'INCREMENT', payload: 2 })
    expect(store.getState()).toEqual({ count: 3 })

    store.dispatch({ type: 'DECREMENT', payload: 2 })
    expect(store.getState()).toEqual({ count: 1 })

    store.dispatch({ type: 'DECREMENT', payload: new Error(), error: true })
    expect(store.getState()).toEqual({ count: 1 })
  })
})
