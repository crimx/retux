import { mergeUniqueObjects } from '../src/merge-unique-objects'

describe('merge-unique-objects', () => {
  it('should merge objects', () => {
    expect(
      mergeUniqueObjects({ a: 1, b: { b1: 2 } }, { c: [1, 2] }, {})
    ).toEqual({
      a: 1,
      b: { b1: 2 },
      c: [1, 2]
    })
  })

  it('should always return new object', () => {
    const obj = { a: 1 }
    const result = mergeUniqueObjects(obj)
    expect(result).toEqual(obj)
    expect(result).not.toBe(obj)
  })

  it('should throw error when there are duplicated keys', () => {
    expect(() => mergeUniqueObjects({ a: 1 }, { a: 2 })).toThrow()
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
    expect(mergeUniqueObjects(new Obj1(), new Obj2())).toEqual({
      prop2: fn
    })
  })
})
