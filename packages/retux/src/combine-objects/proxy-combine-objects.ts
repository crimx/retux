import { hasOwnProperty } from '../utils'
import { WrapResultInHandlers } from './types'
import { combineObjects } from './combine-objects'

/**
 * Same as [[combineObjects]]:
 *
 * - Always returns a new object.
 * - The combined ActionHandlers won't lose index signature.
 *
 * Since it's wrapped with Proxy:
 *
 * - Properties are only created and cached on first visit.
 * - Fallback to [[combineObjects]] if `Proxy` is not supported.
 */
export function proxyCombineObjects<TObjects extends any[]>(
  ...objs: TObjects
): WrapResultInHandlers<TObjects[number]>
export function proxyCombineObjects(...objs: any[]) {
  // cache Object.keys() result
  let cachedOwnKeys: Set<string> | undefined

  // cache 100 nonexistent keys that were accessed
  const nonexistentKeys = new Set<string>()

  const handler: ProxyHandler<{ [k: string]: any }> = {
    get(memo, key: string) {
      if (hasOwnProperty.call(memo, key)) {
        return memo[key]
      }

      if (nonexistentKeys.has(key)) {
        return
      }

      for (let i = objs.length - 1; i >= 0; i--) {
        const obj = objs[i]
        if (hasOwnProperty.call(obj, key)) {
          return (memo[key] = obj[key])
        }
      }

      if (nonexistentKeys.size >= 100) {
        nonexistentKeys.clear()
      }
      nonexistentKeys.add(key)
    },
    ownKeys() {
      if (!cachedOwnKeys) {
        cachedOwnKeys = new Set(
          objs.reduce((arr: string[], obj) => arr.concat(Object.keys(obj)), [])
        )
      }
      return [...cachedOwnKeys]
    },
    getOwnPropertyDescriptor(memo, key: string) {
      if (hasOwnProperty.call(memo, key)) {
        return { value: memo[key], configurable: true, enumerable: true }
      }

      if (nonexistentKeys.has(key)) {
        return
      }

      for (let i = objs.length - 1; i >= 0; i--) {
        const obj = objs[i]
        if (hasOwnProperty.call(obj, key)) {
          memo[key] = obj[key]
          return { value: memo[key], configurable: true, enumerable: true }
        }
      }

      if (nonexistentKeys.size >= 100) {
        nonexistentKeys.clear()
      }
      nonexistentKeys.add(key)
    }
  }

  try {
    return new Proxy(Object.create(null), handler)
  } catch (e) {
    return combineObjects(...objs)
  }
}
