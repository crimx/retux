import {
  ActionHandlers,
  GetStateFromHandlersList,
  GetActionCatalogFromHandlersList
} from './basic/types'
import {
  ActionHandlers as FSAHandlers,
  GetStateFromHandlersList as GetStateFromFSAHandlersList,
  GetActionCatalogFromHandlersList as GetActionCatalogFromFSAHandlersList
} from './fsa/types'
import { IntersectionFromUnion, hasOwnProperty } from './utils'

/**
 * If it is a list of Action Handlers, extract ActionCatalog.
 * so that the resulted object is not losing index signature.
 *
 * @template TObject Union of Object
 */
type WrapResultInHandlers<TObject> = GetActionCatalogFromHandlersList<
  TObject
> extends never
  ? GetActionCatalogFromFSAHandlersList<TObject> extends never
    ? IntersectionFromUnion<TObject>
    : GetStateFromFSAHandlersList<TObject> extends never
    ? IntersectionFromUnion<TObject>
    : FSAHandlers<
        GetStateFromFSAHandlersList<TObject>,
        IntersectionFromUnion<GetActionCatalogFromFSAHandlersList<TObject>>
      >
  : GetStateFromHandlersList<TObject> extends never
  ? IntersectionFromUnion<TObject>
  : ActionHandlers<
      GetStateFromHandlersList<TObject>,
      IntersectionFromUnion<GetActionCatalogFromHandlersList<TObject>>
    >

/**
 * Lazy combine a list of objects with Proxy.
 *
 * Properties are cached on first visit.
 *
 * Properties of latter objects have higher priority.
 */
export function proxyCombineObjects<TObjects extends any[]>(
  ...objs: TObjects
): WrapResultInHandlers<TObjects[number]>
export function proxyCombineObjects(...objs: any[]) {
  // cache Object.keys() result
  let cachedOwnKeys: Set<string> | undefined

  // cache 100 nonexistent keys that were accessed
  const nonexistentKeys = new Set<string>()

  return new Proxy(Object.create(null) as { [k: string]: any }, {
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
  })
}
