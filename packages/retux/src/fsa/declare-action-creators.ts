import { ActionCreator } from './types'
import { createActionCreator } from './create-action-creator'
import { declareDefaultActionCreators } from '../default-action-creators/declare'
import { MixedActionCreators } from '../utils'

/**
 * Lazy generate FSA Creators with signature:
 * `(payload?, meta?) => Action`
 *
 * Action Creators are created on the first call
 * and be reused on subsequence calls.
 *
 * Example
 *
 * ```typescript
 * const action = declareActionCreators<ActionCalatog>()
 * dispatch(action('ACTION_NAME'))
 * dispatch(action('ACTION_NAME')) // same Action Creator
 * ```
 *
 * @template TCatalog Retux Action Catalog
 */
export function declareActionCreators<TCatalog>(): <
  TType extends keyof TCatalog
>(
  type: TType
) => ActionCreator<TCatalog, Extract<TType, keyof TCatalog>>

/**
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 *
 * @template TCatalog Retux Action Catalog
 * @template TExtra Extra Action Handlers
 */
export function declareActionCreators<
  TCatalog,
  TExtra extends MixedActionCreators
>(
  extraActionCreators: TExtra
): <TType extends keyof TCatalog | keyof TExtra>(
  type: TType
) => TType extends keyof TExtra
  ? TExtra[TType]
  : ActionCreator<TCatalog, Extract<TType, keyof TCatalog>>

export function declareActionCreators(
  extraActionCreators?: MixedActionCreators
) {
  return declareDefaultActionCreators(createActionCreator, extraActionCreators)
}
