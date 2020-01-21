import { DefaultActionCatalog } from '../utils'
import { ActionCreator } from './types'

/**
 * Generate single Basic Action Creator with signature:
 * (depending on each Action)
 * ```
 * (payload?, meta?) => Action
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
export function createActionCreator(type: string) {
  return (...args: any[]) => {
    switch (args.length) {
      case 0:
        return { type }
      case 1:
        return { type, payload: args[0] }
      default:
        return { type, payload: args[0], meta: args[1] }
    }
  }
}
