import {
  ActionHandlers,
  GetStateFromHandlersList,
  GetActionCatalogFromHandlersList
} from './basic'
import {
  ActionHandlers as FSAHandlers,
  GetStateFromHandlersList as GetStateFromFSAHandlersList,
  GetActionCatalogFromHandlersList as GetActionCatalogFromFSAHandlersList
} from './fsa'
import { IntersectionFromUnion, hasOwnProperty } from './utils'

/**
 * Like Object.assign except:
 * - Always returns a new object.
 * - Duplicated keys are not allowed.
 * - Symbol-typed properties are ignored.
 */
export function combineUniqueObjects<H extends any[]>(...objs: H) {
  // If it is a list of Action Handlers, extract ActionCatalog
  // so that the resulted object is not losing index signature.
  type Result = GetActionCatalogFromHandlersList<H> extends never
    ? GetActionCatalogFromFSAHandlersList<H> extends never
      ? IntersectionFromUnion<H[number]>
      : GetStateFromFSAHandlersList<H> extends never
      ? IntersectionFromUnion<H[number]>
      : FSAHandlers<
          GetStateFromFSAHandlersList<H>,
          IntersectionFromUnion<GetActionCatalogFromFSAHandlersList<H>>
        >
    : GetStateFromHandlersList<H> extends never
    ? IntersectionFromUnion<H[number]>
    : ActionHandlers<
        GetStateFromHandlersList<H>,
        IntersectionFromUnion<GetActionCatalogFromHandlersList<H>>
      >

  const result: { [k: string]: any } = {}
  for (let i = 0; i <= objs.length; i++) {
    const obj = objs[i]
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        if (hasOwnProperty.call(result, key)) {
          throw new Error(`Merge unique objects error: duplicated key ${key}.`)
        }
        result[key] = obj[key]
      }
    }
  }
  return result as Result
}
