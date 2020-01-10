import { ActionCreator, GetActionCatalogFromHandlers } from './types'
import { createActionCreator } from './create-action-creator'
import { proxyDefaultActionCreators } from '../default-action-creators/proxy'
import { MixedActionCreators, DefaultActionCreator } from '../utils'

/**
 * Lazy generate Basic Action Creators with signature:
 * `(payload?, meta?) => Action`
 *
 * Action Creators are created on first visit
 * and be reused on subsequence visits.
 *
 * Fallback to [[createDefaultActionCreators]]
 * if `Proxy` is not supported.
 *
 * Example
 *
 * ```typescript
 * const action = proxyActionCreators(actionHandlers)
 * dispatch(action.ACTION_NAME)
 * dispatch(action.ACTION_NAME) // same action creator
 * ```
 *
 * Rewire `ACTION1` to an alternative Action Creator.
 *
 * ```typescript
 * const action = proxyActionCreators(
 *   actionHandlers,
 *   {
 *     ACTION1: () => {}
 *   }
 * )
 * ```
 *
 * @param actionHandlers Retux Action Handlers.
 */
export function proxyActionCreators<
  THandlers extends {},
  TCatalog = GetActionCatalogFromHandlers<THandlers>
>(
  actionHandlers: THandlers
): TCatalog extends never
  ? {
      [key in keyof THandlers]: DefaultActionCreator
    }
  : {
      [key in keyof THandlers]: key extends keyof TCatalog
        ? ActionCreator<TCatalog, key>
        : DefaultActionCreator
    }

/**
 * @param actionHandlers Retux Action Handlers.
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 */
export function proxyActionCreators<
  THandlers extends {},
  TCatalog = GetActionCatalogFromHandlers<THandlers>,
  TExtra extends MixedActionCreators = MixedActionCreators
>(
  actionHandlers: THandlers,
  extraActionCreators: TExtra
): (TCatalog extends never
  ? {
      [key in Exclude<keyof THandlers, keyof TExtra>]: DefaultActionCreator
    }
  : {
      [key in Exclude<
        keyof THandlers,
        keyof TExtra
      >]: key extends keyof TCatalog
        ? ActionCreator<TCatalog, key>
        : DefaultActionCreator
    }) &
  TExtra

export function proxyActionCreators(
  actionHandlers: { [type: string]: (...args: any) => any },
  extraActionCreators?: MixedActionCreators
) {
  return proxyDefaultActionCreators(
    createActionCreator,
    actionHandlers,
    extraActionCreators
  )
}
