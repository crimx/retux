import { ActionCreator } from './types'
import { createActionCreator } from './create-action-creator'
import { proxyDefaultActionCreators } from '../default-action-creators/proxy'
import { MixedActionCreators } from '../utils'

/**
 * Lazy generate Basic Action Creators with signature:
 * `(payload?, meta?) => Action`
 *
 * Action Creators are created on first visit
 * and be reused on subsequence visits.
 *
 * Requires modern JS engine which supports `Proxy`.
 *
 * Notice the `()()` in the example.
 * Due to limitation of TypeScript, this function is
 * curried in order to infer the extra Action Creators.
 *
 * Example
 *
 * ```typescript
 * const action = proxyActionCreators<ActionCalatog>()()
 * dispatch(action.ACTION_NAME)
 * dispatch(action.ACTION_NAME) // same Action Creator
 * ```
 *
 * Rewire `ACTION1` to an alternative Action Creator.
 *
 * ```typescript
 * const action = proxyActionCreators<ActionCatalog>()({
 *   ACTION1: () => {}
 * })
 * ```
 *
 * @template TCatalog Retux Action Catalog
 */
export function proxyActionCreators<TCatalog>(): <
  TExtra extends MixedActionCreators
>(
  extraActionCreators?: TExtra
) => {
  [key in Exclude<keyof TCatalog, keyof TExtra>]: ActionCreator<TCatalog, key>
} &
  TExtra

export function proxyActionCreators() {
  return (extraActionCreators?: MixedActionCreators) =>
    proxyDefaultActionCreators(createActionCreator, extraActionCreators)
}
