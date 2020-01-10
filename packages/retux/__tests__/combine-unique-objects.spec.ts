import {
  combineUniqueObjects,
  ActionHandlers,
  FSAHandlers,
  CreateActionCatalog,
  createReducer
} from '../src'

describe('combine-unique-objects', () => {
  it('should throw error when there are duplicated keys', () => {
    expect(() => combineUniqueObjects({ a: 1 }, { a: 2 })).toThrow()
  })

  it('should combine objects', () => {
    expect(
      combineUniqueObjects({ a: 1, b: { b1: 2 } }, { c: [1, 2] }, {})
    ).toEqual({
      a: 1,
      b: { b1: 2 },
      c: [1, 2]
    })
  })

  it('should always return new object', () => {
    const obj = { a: 1 }
    const result = combineUniqueObjects(obj)
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
    expect(combineUniqueObjects(new Obj1(), new Obj2())).toEqual({
      prop2: fn
    })
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

    const actionHandlers = combineUniqueObjects(
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

    const actionHandlers = combineUniqueObjects(
      actionHandlers1,
      actionHandlers2
    )

    const reducer = createReducer(state, actionHandlers)

    expect(reducer(state, { type: 'ACTION1' })).toBe(state)
    expect(reducer(state, { type: 'ACTION2', payload: 2 })).toBe(state + 2)
  })
})
