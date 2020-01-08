import {
  ActionHandlers,
  createActionCreators,
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
        const action = proxyActionCreators(actionHandlers)

        expect(action['xxx' as keyof typeof action]).toBeUndefined()
        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
        expect(action.ACTION3(true, false)).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: false
        })
      })

      it('should proxy actions creators with extraActionCreators', () => {
        const action = proxyActionCreators(actionHandlers, {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
        })

        expect(action['xxx' as keyof typeof action]).toBeUndefined()
        expect(action.ACTION1()).toEqual({ type: 'ACTION1' })
        expect(action.ACTION2(40)).toEqual({ type: 'ACTION2', payload: 40 })
        expect(action.ACTION3(true, false)).toEqual({
          type: 'ACTION3',
          payload: true,
          meta: false
        })
        expect(action.ACTION4()).toEqual({ type: 'ACTION2', payload: 12 })
      })

      it('should work with Object.keys', () => {
        const action1 = proxyActionCreators(actionHandlers)
        const action2 = proxyActionCreators(actionHandlers, {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
        })
        expect(Object.keys(action1).sort()).toEqual(
          Object.keys(actionHandlers).sort()
        )
        expect(Object.keys(action2).sort()).toEqual(
          [...Object.keys(actionHandlers), 'ACTION4'].sort()
        )
      })

      it('should return fresh array with Object.keys', () => {
        const action1 = proxyActionCreators(actionHandlers)
        const action2 = proxyActionCreators(actionHandlers, {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
        })

        expect(Object.keys(action1)).not.toBe(Object.keys(action1))
        expect(Object.keys(action2)).not.toBe(Object.keys(action2))
      })

      it('should work with hasOwnProperty', () => {
        const action1 = proxyActionCreators(actionHandlers)
        const action2 = proxyActionCreators(actionHandlers, {
          ACTION4: (): Action<ActionCatalog, 'ACTION2'> => ({
            type: 'ACTION2',
            payload: 12
          })
        })

        const { hasOwnProperty } = Object.prototype

        expect(hasOwnProperty.call(action1, 'xxx')).toBeFalsy()
        expect(hasOwnProperty.call(action1, 'ACTION1')).toBeTruthy()

        expect(hasOwnProperty.call(action2, 'xxx')).toBeFalsy()
        expect(hasOwnProperty.call(action2, 'ACTION1')).toBeTruthy()
        expect(hasOwnProperty.call(action2, 'ACTION4')).toBeTruthy()
      })
    })
  })
})
