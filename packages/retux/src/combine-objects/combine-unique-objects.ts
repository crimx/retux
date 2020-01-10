import { WrapResultInHandlers, DuplicatedKeysInObjects } from './types'
import { combineObjects } from './combine-objects'

/**
 * Same as [[combineObjects]]:
 *
 * - Always returns a new object.
 * - The combined ActionHandlers won't lose index signature.
 *
 * Except:
 *
 * - Duplicated keys are not allowed.
 *   The resulted type will be inferred as `never`
 *   if there are(or potential) duplicated keys.
 */
export function combineUniqueObjects<TObjects extends any[]>(
  ...objs: TObjects
): DuplicatedKeysInObjects<TObjects> extends never
  ? WrapResultInHandlers<TObjects[number]>
  : never
export function combineUniqueObjects(...objs: any[]) {
  const combinedObjs = combineObjects(...objs)
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    if (
      objs.reduce((sum, o) => sum + Object.keys(o).length, 0) !==
      Object.keys(combinedObjs).length
    ) {
      throw new Error('Combine Unique Objects: Duplicated keys found.')
    }
  }
  return combinedObjs
}
