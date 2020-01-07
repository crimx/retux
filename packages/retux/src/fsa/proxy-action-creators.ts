import { ActionCreator } from './types'
import { createActionCreator } from './create-action-creator'
import { proxyDefaultActionCreators } from '../default-action-creators/proxy'
import { MixedActionCreators } from '../utils'

/**
 * Lazy generate FSA Creators with signature:
 * `(payload?, meta?) => Action`
 *
 * Action Creators are created on first visit
 * and be reused on subsequence visits.
 *
 * Requires modern JS engine which supports `Proxy`.
 *
 * Example
 *
 * ```typescript
 * const action = proxyActionCreators<ActionCalatog>()
 * dispatch(action.ACTION_NAME)
 * dispatch(action.ACTION_NAME) // same Action Creator
 * ```
 *
 * @template TCatalog Retux Action Catalog
 */
export function proxyActionCreators<TCatalog>(): {
  [key in keyof TCatalog]: ActionCreator<TCatalog, key>
}

/**
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 *
 * @template TCatalog Retux Action Catalog
 * @template TExtra Extra Action Handlers
 */
export function proxyActionCreators<
  TCatalog,
  TExtra extends MixedActionCreators = {}
>(
  extraActionCreators: TExtra
): {
  [key in Exclude<keyof TCatalog, keyof TExtra>]: ActionCreator<TCatalog, key>
} &
  TExtra

export function proxyActionCreators(extraActionCreators?: MixedActionCreators) {
  return proxyDefaultActionCreators(createActionCreator, extraActionCreators)
}
