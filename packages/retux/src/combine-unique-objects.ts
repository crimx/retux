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
 * Like Object.assign except:
 * - Always returns a new object.
 * - Duplicated keys are not allowed.
 * - Symbol-typed properties are ignored.
 */
export function combineUniqueObjects<TObjects extends any[]>(
  ...objs: TObjects
): WrapResultInHandlers<TObjects[number]>
export function combineUniqueObjects(...objs: any[]) {
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
  return result
}
