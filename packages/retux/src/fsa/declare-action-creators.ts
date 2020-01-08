import { ActionCreator } from './types'
import { createActionCreator } from './create-action-creator'
import { declareDefaultActionCreators } from '../default-action-creators/declare'
import { MixedActionCreators } from '../utils'

/**
 * Lazy generate Flux Standard Action Creators with signature:
 * `(payload?, meta?) => Action`
 *
 * Action Creators are created on the first call
 * and be reused on subsequence calls.
 *
 * Notice the `()()` in the example.
 * Due to limitation of TypeScript, this function is
 * curried in order to infer the extra Action Creators.
 *
 * Example
 *
 * ```typescript
 * const action = declareActionCreators<ActionCalatog>()()
 * dispatch(action('ACTION_NAME'))
 * dispatch(action('ACTION_NAME')) // same Action Creator
 * ```
 *
 * Rewire `ACTION1` to an alternative Action Creator.
 *
 * ```typescript
 * const action = declareActionCreators<ActionCatalog>()({
 *   ACTION1: () => {}
 * })
 * ```
 *
 * @template TCatalog Retux Action Catalog
 */
export function declareActionCreators<TCatalog>(): <
  TExtra extends MixedActionCreators
>(
  extraActionCreators?: TExtra
) => <TType extends keyof TCatalog | keyof TExtra>(
  type: TType
) => TType extends keyof TExtra
  ? TExtra[TType]
  : ActionCreator<TCatalog, Extract<TType, keyof TCatalog>>

export function declareActionCreators() {
  return (extraActionCreators?: MixedActionCreators) =>
    declareDefaultActionCreators(createActionCreator, extraActionCreators)
}
