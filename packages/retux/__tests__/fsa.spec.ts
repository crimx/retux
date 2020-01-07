import {
  ActionHandlers,
  createActionCreators,
  declareActionCreators,
  proxyActionCreators
} from '../src/fsa'
import { createStore } from 'redux'
import { createReducer, CreateActionCatalog } from '../src'
import { Action } from '../lib/fsa'

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

  describe('Generate Action Creators', () => {
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

    describe('createActionCreators', () => {
      it('should create actions creators without extraActionCreators', () => {
        const action = createActionCreators(actionHandlers)

        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION1(undefined, false)).toEqual({
          type: 'ACTION1',
          error: false
        })
        expect(action.ACTION1(new Error(), true)).toEqual({
          type: 'ACTION1',
          error: true,
          payload: new Error()
        })

        expect(action.ACTION2('40')).toEqual({ type: 'ACTION2', payload: '40' })
        expect(action.ACTION2('40', false)).toEqual({
          type: 'ACTION2',
          payload: '40',
          error: false
        })
        expect(action.ACTION2(new Error(), true)).toEqual({
          type: 'ACTION2',
          payload: new Error(),
          error: true
        })

        expect(action.ACTION3(true, false, 40)).toEqual({
          type: 'ACTION3',
          payload: true,
          error: false,
          meta: 40
        })
        expect(action.ACTION3(new Error(), true, 122)).toEqual({
          type: 'ACTION3',
          payload: new Error(),
          error: true,
          meta: 122
        })
      })

      it('should create actions creators with extraActionCreators', () => {
        const action = createActionCreators(actionHandlers, {
          ACTION3: (): Action<ActionCatalog, 'ACTION3'> => ({
            type: 'ACTION3',
            payload: true,
            meta: 123
          }),
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: '12'
          })
        })

        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION2('40')).toEqual({ type: 'ACTION2', payload: '40' })
        expect(action.ACTION3()).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: 123
        })
        expect(action.ACTION4()).toEqual({ type: 'ACTION2', payload: '12' })
      })
    })

    describe('declareActionCreators', () => {
      it('should declare actions creators without extraActionCreators', () => {
        const action = declareActionCreators<ActionCatalog>()

        expect(action('ACTION1')()).toEqual({ type: 'ACTION1' })
        expect(action('ACTION1')(undefined, false)).toEqual({
          type: 'ACTION1',
          error: false
        })
        expect(action('ACTION1')(new Error(), true)).toEqual({
          type: 'ACTION1',
          error: true,
          payload: new Error()
        })

        expect(action('ACTION2')('40')).toEqual({
          type: 'ACTION2',
          payload: '40'
        })
        expect(action('ACTION2')('40', false)).toEqual({
          type: 'ACTION2',
          payload: '40',
          error: false
        })
        expect(action('ACTION2')(new Error(), true)).toEqual({
          type: 'ACTION2',
          payload: new Error(),
          error: true
        })

        expect(action('ACTION3')(true, false, 40)).toEqual({
          type: 'ACTION3',
          payload: true,
          error: false,
          meta: 40
        })
        expect(action('ACTION3')(new Error(), true, 122)).toEqual({
          type: 'ACTION3',
          payload: new Error(),
          error: true,
          meta: 122
        })
      })

      it('should declare actions creators with extraActionCreators', () => {
        const rewiredActionCreators = {
          ACTION3: (): Action<ActionCatalog, 'ACTION3'> => ({
            type: 'ACTION3',
            payload: true,
            meta: 123
          }),
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: '12'
          })
        }

        const action = declareActionCreators<
          ActionCatalog,
          typeof rewiredActionCreators
        >(rewiredActionCreators)

        expect(action('ACTION1')()).toEqual({ type: 'ACTION1' })
        expect(action('ACTION2')('40')).toEqual({
          type: 'ACTION2',
          payload: '40'
        })
        expect(action('ACTION3')()).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: 123
        })
        expect(action('ACTION4')()).toEqual({ type: 'ACTION2', payload: '12' })
      })
    })

    describe('proxyActionCreators', () => {
      it('should proxy actions creators without extraActionCreators', () => {
        const action = proxyActionCreators<ActionCatalog>()

        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION1(undefined, false)).toEqual({
          type: 'ACTION1',
          error: false
        })
        expect(action.ACTION1(new Error(), true)).toEqual({
          type: 'ACTION1',
          error: true,
          payload: new Error()
        })

        expect(action.ACTION2('40')).toEqual({ type: 'ACTION2', payload: '40' })
        expect(action.ACTION2('40', false)).toEqual({
          type: 'ACTION2',
          payload: '40',
          error: false
        })
        expect(action.ACTION2(new Error(), true)).toEqual({
          type: 'ACTION2',
          payload: new Error(),
          error: true
        })

        expect(action.ACTION3(true, false, 40)).toEqual({
          type: 'ACTION3',
          payload: true,
          error: false,
          meta: 40
        })
        expect(action.ACTION3(new Error(), true, 122)).toEqual({
          type: 'ACTION3',
          payload: new Error(),
          error: true,
          meta: 122
        })
      })

      it('should proxy actions creators with extraActionCreators', () => {
        const rewiredActionCreators = {
          ACTION3: (): Action<ActionCatalog, 'ACTION3'> => ({
            type: 'ACTION3',
            payload: true,
            meta: 123
          }),
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: '12'
          })
        }

        const action = proxyActionCreators<
          ActionCatalog,
          typeof rewiredActionCreators
        >(rewiredActionCreators)

        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION2('40')).toEqual({ type: 'ACTION2', payload: '40' })
        expect(action.ACTION3()).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: 123
        })
        expect(action.ACTION4()).toEqual({ type: 'ACTION2', payload: '12' })
      })
    })
  })
})
