import { WrapResultInHandlers, DuplicatedKeysInObjects } from './types'
import { proxyCombineObjects } from './proxy-combine-objects'

/**
 * Same as [[combineUniqueObjects]]:
 *
 * - Always returns a new object.
 * - The combined ActionHandlers won't lose index signature.
 * - Duplicated keys are not allowed.
 *   The resulted type will be inferred as `never`
 *   if there are(or potential) duplicated keys.
 *
 * Since it's wrapped with Proxy:
 *
 * - Properties are only created and cached on first visit.
 * - Fallback to [[combineUniqueObjects]] if `Proxy` is not supported.
 */
export function proxyCombineUniqueObjects<TObjects extends any[]>(
  ...objs: TObjects
): DuplicatedKeysInObjects<TObjects> extends never
  ? WrapResultInHandlers<TObjects[number]>
  : never
export function proxyCombineUniqueObjects(...objs: any[]) {
  const combinedObjs = proxyCombineObjects(...objs)
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    if (
      objs.reduce((sum, o) => sum + Object.keys(o).length, 0) !==
      Object.keys(combinedObjs).length
    ) {
      throw new Error('Proxy Combine Unique Objects: Duplicated keys found.')
    }
  }
  return combinedObjs
}
