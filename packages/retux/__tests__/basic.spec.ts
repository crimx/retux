import {
  ActionHandlers,
  createActionCreators,
  declareActionCreators,
  Action,
  proxyActionCreators
} from '../src/basic'
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

  describe('Generate Action Creators', () => {
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

    describe('createActionCreators', () => {
      it('should create actions creators without extraActionCreators', () => {
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
        const action = createActionCreators(actionHandlers, {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
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

    describe('declareActionCreators', () => {
      it('should declare actions creators without extraActionCreators', () => {
        const action = declareActionCreators<ActionCatalog>()

        expect(action('ACTION1')()).toEqual({ type: 'ACTION1' })
        expect(action('ACTION2')(40)).toEqual({ type: 'ACTION2', payload: 40 })
        expect(action('ACTION3')(true, false)).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: false
        })
      })

      it('should declare actions creators with extraActionCreators', () => {
        const rewiredActionCreators = {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
        }

        const action = declareActionCreators<
          ActionCatalog,
          typeof rewiredActionCreators
        >(rewiredActionCreators)

        expect(action('ACTION1')()).toEqual({ type: 'ACTION1' })
        expect(action('ACTION2')(40)).toEqual({ type: 'ACTION2', payload: 40 })
        expect(action('ACTION3')(true, false)).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: false
        })
        expect(action('ACTION4')()).toEqual({ type: 'ACTION2', payload: 12 })
      })
    })

    describe('proxyActionCreators', () => {
      it('should proxy actions creators without extraActionCreators', () => {
        const action = proxyActionCreators<ActionCatalog>()

        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
        expect(action.ACTION3(true, false)).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: false
        })
      })

      it('should proxy actions creators with extraActionCreators', () => {
        const rewiredActionCreators = {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
        }

        const action = proxyActionCreators<
          ActionCatalog,
          typeof rewiredActionCreators
        >(rewiredActionCreators)

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
})
