import { IntersectionFromUnion } from './utils'

/**
 * Like Object.assign except:
 * - Duplicated keys are not allowed.
 * - Always returns a new object.
 */
export function mergeUniqueObjects<S extends any[]>(
  ...objs: S
): IntersectionFromUnion<S[number]> {
  const result: { [k: string]: any } = {}
  for (let i = 0; i <= objs.length; i++) {
    const obj = objs[i]
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          throw new Error(`Merge unique objects error: duplicated key ${key}.`)
        }
        result[key] = obj[key]
      }
    }
  }
  return result as IntersectionFromUnion<S[number]>
}
