import { GetActionCatalogFromHandlers, ActionCreator } from './types'
import { createActionCreator } from './create-action-creator'
import { createDefaultActionCreators } from '../default-action-creators/create'
import { DefaultActionCreator, MixedActionCreators } from '../utils'

/**
 * Generate Basic Action Creators with signature:
 * `(payload?, meta?) => Action`
 *
 * Example
 *
 * ```typescript
 * const action = createActionCreators(actionHandlers)
 * dispatch(action.ACTION_NAME)
 * ```
 *
 * Rewire `ACTION1` to an alternative Action Creator.
 *
 * ```typescript
 * const action = createActionCreators(
 *   actionHandlers,
 *   {
 *     ACTION1: () => {}
 *   }
 * )
 * ```
 *
 * @param actionHandlers Retux Action Handlers.
 */
export function createActionCreators<
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
export function createActionCreators<
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

export function createActionCreators(
  actionHandlers: { [type: string]: (...args: any) => any },
  extraActionCreators?: MixedActionCreators
) {
  return createDefaultActionCreators(
    createActionCreator,
    actionHandlers,
    extraActionCreators
  )
}
