import { ActionHandlers, createActionCreators } from '../src/fsa'
import { CreateActionCatalog } from '../src/utils'
import { createReducer } from '../src/create-reducer'
import { createStore } from 'redux'

describe('fsa', () => {
  describe('should create correct reducer', () => {
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

      const counterActionHandlers: ActionHandlers<
        CounterState,
        CounterActionCatalog
      > = {
        INCREMENT: (state, action) =>
          action.error
            ? state
            : {
                count:
                  state.count + (action.payload == null ? 1 : action.payload)
              },
        DECREMENT: (state, action) =>
          action.error
            ? state
            : {
                count:
                  state.count - (action.payload == null ? 1 : action.payload)
              }
      }

      const reducer = createReducer(initState, counterActionHandlers)

      const store = createStore(reducer)

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

  describe('createActionCreators', () => {
    it('should create actions creators without extraActionCreators', () => {
      type ActionCatalog = CreateActionCatalog<{
        ACTION1: {}
        ACTION2: {
          payload: string
        }
        ACTION3: {
          payload: boolean
          meta: number
        }
      }>

      const actionHandlers: ActionHandlers<{}, ActionCatalog> = {
        ACTION1: state => state,
        ACTION2: state => state,
        ACTION3: state => state
      }

      const action = createActionCreators(actionHandlers)

      expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
      expect(action.ACTION2('40')).toEqual({ type: 'ACTION2', payload: '40' })
      expect(action.ACTION3(true, 40)).toEqual({
        type: 'ACTION3',
        payload: true,
        meta: 40
      })
      expect(action.ACTION3(new Error(), 122, true)).toEqual({
        type: 'ACTION3',
        payload: new Error(),
        meta: 122,
        error: true
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
        ACTION3: () =>
          ({ type: 'ACTION3', payload: true, meta: true } as const),
        ACTION4: () => ({ type: 'ACTION2', payload: 12 } as const)
      })

      expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
      expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
      expect(action.ACTION3()).toEqual({
        type: 'ACTION3',
        payload: true,
        meta: true
      })
      expect(action.ACTION4()).toEqual({ type: 'ACTION2', payload: 12 })
    })
  })
})
