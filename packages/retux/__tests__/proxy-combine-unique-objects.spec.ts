import {
  proxyCombineUniqueObjects,
  ActionHandlers,
  FSAHandlers,
  CreateActionCatalog,
  createReducer
} from '../src'

describe('proxy-combine-unique-objects', () => {
  it('should throw error when there are duplicated keys', () => {
    expect(() => proxyCombineUniqueObjects({ a: 1 }, { a: 2 })).toThrow()
  })

  it('should combine objects', () => {
    expect(
      proxyCombineUniqueObjects({ a: 1, b: { b1: 2 } }, { c: [1, 2] }, {})
    ).toEqual({
      a: 1,
      b: { b1: 2 },
      c: [1, 2]
    })
  })

  it('should always return new object', () => {
    const obj = { a: 1 }
    const result = proxyCombineUniqueObjects(obj)
    expect(result).toEqual(obj)
    expect(result).not.toBe(obj)
  })

  it('should ignore properties on prototype chain', () => {
    const fn = () => {}

    function Obj1() {}
    Obj1.prototype.prop1 = fn

    function Obj2() {
      // @ts-ignore
      this.prop2 = fn
    }

    // @ts-ignore
    const result = proxyCombineUniqueObjects(new Obj1(), new Obj2())
    // @ts-ignore
    expect(result.prop1).toBeUndefined()
    // @ts-ignore
    expect(result.prop2).toBe(fn)
  })

  it('should combine basic action handlers without losing index signature', () => {
    const state: number = 1

    type ActionCatalog1 = CreateActionCatalog<{
      ACTION1: {}
    }>

    const actionHandlers1: ActionHandlers<typeof state, ActionCatalog1> = {
      ACTION1: state => state
    }

    type ActionCatalog2 = CreateActionCatalog<{
      ACTION2: { payload: number }
    }>

    const actionHandlers2: ActionHandlers<typeof state, ActionCatalog2> = {
      ACTION2: (state, action) => state + action.payload
    }

    const actionHandlers = proxyCombineUniqueObjects(
      actionHandlers1,
      actionHandlers2
    )

    const reducer = createReducer(state, actionHandlers)

    expect(reducer(state, { type: 'ACTION1' })).toBe(state)
    expect(reducer(state, { type: 'ACTION2', payload: 2 })).toBe(state + 2)
  })

  it('should combine flux action handlers without losing index signature', () => {
    const state: number = 1

    type ActionCatalog1 = CreateActionCatalog<{
      ACTION1: {}
    }>

    const actionHandlers1: FSAHandlers<typeof state, ActionCatalog1> = {
      ACTION1: state => state
    }

    type ActionCatalog2 = CreateActionCatalog<{
      ACTION2: { payload: number }
    }>

    const actionHandlers2: FSAHandlers<typeof state, ActionCatalog2> = {
      ACTION2: (state, action) => state + (action.error ? 1 : action.payload)
    }

    const actionHandlers = proxyCombineUniqueObjects(
      actionHandlers1,
      actionHandlers2
    )

    const reducer = createReducer(state, actionHandlers)

    expect(reducer(state, { type: 'ACTION1' })).toBe(state)
    expect(reducer(state, { type: 'ACTION2', payload: 2 })).toBe(state + 2)
  })

  it('should works fine after accessing over 100 nonexistent keys', () => {
    const obj = proxyCombineUniqueObjects({} as { [k: string]: any }, {
      otherKey: () => 'OtherKey'
    })

    // check one key over 100 times
    for (let i = 0; i <= 110; i++) {
      // @ts-ignore
      expect(obj.xxx).toBeUndefined()
    }

    // check over 100 keys over 100 times
    for (let i = 0; i <= 110; i++) {
      expect(obj[Date.now() + i]).toBeUndefined()
    }
  })

  it('should works fine after checking own properties on over 100 nonexistent keys', () => {
    const obj = proxyCombineUniqueObjects({} as { [k: string]: any }, {
      otherKey: () => 'OtherKey'
    })

    const { hasOwnProperty } = Object.prototype

    for (let i = 0; i <= 110; i++) {
      expect(hasOwnProperty.call(obj, 'xxx')).toBeFalsy()
      expect(hasOwnProperty.call(obj, 'otherKey')).toBeTruthy()
    }

    for (let i = 0; i <= 110; i++) {
      expect(hasOwnProperty.call(obj, Date.now() + i)).toBeFalsy()
    }
  })

  it('should fallback to combineObjects when Proxy is not supported', () => {
    const originProxy = Proxy
    const originSet = Set

    // eslint-disable-next-line no-global-assign
    Proxy = (undefined as unknown) as ProxyConstructor
    // eslint-disable-next-line no-global-assign
    Set = (undefined as unknown) as SetConstructor

    expect(Proxy).toBeUndefined()
    expect(Set).toBeUndefined()

    expect(
      proxyCombineUniqueObjects({ a: 1, b: { b1: 2 } }, { c: [1, 2] }, {})
    ).toEqual({
      a: 1,
      b: { b1: 2 },
      c: [1, 2]
    })

    // eslint-disable-next-line no-global-assign
    Proxy = originProxy
    // eslint-disable-next-line no-global-assign
    Set = originSet
  })
})
