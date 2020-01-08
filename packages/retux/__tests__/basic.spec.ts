import {
  ActionHandlers,
  createActionCreators,
  // declareActionCreators,
  Action,
  proxyActionCreators
} from '../src/basic'
import { CreateActionCatalog } from '../src'

describe('basic', () => {
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

    describe('proxyActionCreators', () => {
      it('should proxy actions creators without extraActionCreators', () => {
        const action = proxyActionCreators<ActionCatalog>()()

        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
        expect(action.ACTION3(true, false)).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: false
        })
      })

      it('should proxy actions creators with extraActionCreators', () => {
        const action = proxyActionCreators<ActionCatalog>()({
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

    describe.skip('declareActionCreators', () => {
      // it('should declare actions creators without extraActionCreators', () => {
      //   const action = declareActionCreators<ActionCatalog>()()
      //   expect(action('ACTION1')()).toEqual({ type: 'ACTION1' })
      //   expect(action('ACTION2')(40)).toEqual({ type: 'ACTION2', payload: 40 })
      //   expect(action('ACTION3')(true, false)).toEqual({
      //     type: 'ACTION3',
      //     payload: true,
      //     meta: false
      //   })
      // })
      // it('should declare actions creators with extraActionCreators', () => {
      //   const action = declareActionCreators<ActionCatalog>()({
      //     ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
      //       type: 'ACTION2',
      //       payload: 12
      //     })
      //   })
      //   expect(action('ACTION1')()).toEqual({ type: 'ACTION1' })
      //   expect(action('ACTION2')(40)).toEqual({ type: 'ACTION2', payload: 40 })
      //   expect(action('ACTION3')(true, false)).toEqual({
      //     type: 'ACTION3',
      //     payload: true,
      //     meta: false
      //   })
      //   expect(action('ACTION4')()).toEqual({ type: 'ACTION2', payload: 12 })
      // })
    })
  })
})
