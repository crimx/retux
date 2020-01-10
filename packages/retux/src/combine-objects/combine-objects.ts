import { WrapResultInHandlers } from './types'

/**
 * Like Object.assign except:
 * - Always returns a new object.
 * - The combined ActionHandlers won't lose index signature.
 */
export function combineObjects<TObjects extends any[]>(
  ...objs: TObjects
): WrapResultInHandlers<TObjects[number]>
export function combineObjects(...objs: any[]) {
  return Object.assign({}, ...objs)
}
