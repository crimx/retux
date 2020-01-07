import { DefaultActionCatalog } from '../utils'
import { ActionCreator } from './types'

/**
 * Generate single FSA Creator with signature:
 * (depending on each Action)
 * ```
 * (payload?, error?, meta?) => Action
 * ```
 *
 * @template TCatalog ActionCatalog
 * @template TType Action Type
 *
 * @param type action type
 */
export function createActionCreator<
  TCatalog = DefaultActionCatalog,
  TType extends keyof TCatalog = keyof TCatalog
>(type: TType): ActionCreator<TCatalog, TType>
export function createActionCreator<
  TCatalog = DefaultActionCatalog,
  TType extends keyof TCatalog = keyof TCatalog
>(type: TType) {
  return (...args: any): unknown => {
    switch (args.length) {
      case 0:
        return { type }
      case 1:
        return { type, payload: args[0] }
      case 2:
        return { type, payload: args[0], error: args[1] }
      default:
        return { type, payload: args[0], error: args[1], meta: args[2] }
    }
  }
}
