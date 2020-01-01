import { ActionHandlers, createActionCreators } from '../src/basic'
import { createReducer, CreateActionCatalog } from '../src'

import { createStore } from 'redux'

describe('basic', () => {
  describe('createReducer', () => {
    it('should create correct reducer', () => {
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

      const counterActionHandlers: ActionHandlers<
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

      const store = createStore(createReducer(initState, counterActionHandlers))

      expect(store.getState()).toEqual({ count: 0 })

      store.dispatch({ type: 'INCREMENT' })
      expect(store.getState()).toEqual({ count: 1 })

      store.dispatch({ type: 'INCREMENT', payload: 2 })
      expect(store.getState()).toEqual({ count: 3 })

      store.dispatch({ type: 'DECREMENT', payload: 2 })
      expect(store.getState()).toEqual({ count: 1 })
    })
  })

  describe('createActionCreators', () => {
    it('should create actions creators without extraActionCreators', () => {
      type ActionCatalog = CreateActionCatalog<{
        ACTION1: {}
        ACTION2: {
          payload: number
        }
        ACTION3: {
          payload: boolean
          meta: boolean
        }
      }>

      const actionHandlers: ActionHandlers<{}, ActionCatalog> = {
        ACTION1: state => state,
        ACTION2: state => state,
        ACTION3: state => state
      }

      const action = createActionCreators(actionHandlers)

      expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
      expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
      expect(action.ACTION3(true, false)).toEqual({
        type: 'ACTION3',
        payload: true,
        meta: false
      })
    })

    it('should create actions creators with extraActionCreators', () => {
      type ActionCatalog = CreateActionCatalog<{
        ACTION1: {}
        ACTION2: {
          payload: number
        }
        ACTION3: {
          payload: boolean
          meta: boolean
        }
      }>

      const actionHandlers: ActionHandlers<{}, ActionCatalog> = {
        ACTION1: state => state,
        ACTION2: state => state,
        ACTION3: state => state
      }

      const action = createActionCreators(actionHandlers, {
        ACTION4: () => ({ type: 'ACTION2', payload: 12 } as const)
      })

      expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
      expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
      expect(action.ACTION3(true, false)).toEqual({
        type: 'ACTION3',
        payload: true,
        meta: false
      })
      expect(action.ACTION4()).toEqual({ type: 'ACTION2', payload: 12 })
    })
  })
})
