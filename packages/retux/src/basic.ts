import {
  DefaultActionCatalog,
  ActionType,
  DefaultActionHandler,
  IntersectionFromUnion
} from './utils'
import { createActionCreators as createDefaultActionCreators } from './create-action-creators'
import { mergeUniqueObjects } from './merge-unique-objects'

/**
 * Get basic action types. ({ type, payload?, meta? })
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type Action<C, T extends keyof C = keyof C> = T extends ActionType<C> // generate union
  ? Readonly<{ type: T } & Pick<C[T], Extract<'payload' | 'meta', keyof C[T]>>>
  : never

/**
 * Get basic action handler type of a module.
 * @template S Module state.
 * @template C ActionCatalog.
 * @template T Action type.
 */
export type ActionHandler<S, C, T extends keyof C> = DefaultActionHandler<
  S,
  Action<C, T>
>

/**
 * Get all basic action handler types of a module.
 * @template S Module state.
 * @template C Module ActionCatalog.
 */
export type ActionHandlers<S, C> = {
  readonly [K in keyof C]: ActionHandler<S, C, K>
}

/**
 * Extract ActionCatalog from ActionHandlers
 *
 * @template H ActionHandlers
 */
export type GetActionCatalogFromHandlers<H> = H extends ActionHandlers<
  infer S,
  infer C
>
  ? C
  : never

/**
 * Extract ActionCatalog from list of ActionHandlers
 *
 * @template H ActionHandlers
 */
type GetActionCatalogFromHandlersList<H> = H extends ActionHandlers<
  infer S,
  infer C
>[]
  ? C
  : never

/**
 * Extract State from List of ActionHandlers
 *
 * @template H ActionHandlers
 */
export type GetStateFromHandlersList<H> = H extends ActionHandlers<
  infer S,
  infer C
>[]
  ? S
  : never

/**
 * Merge multiple action handlers into one.
 * Use `mergeUniqueObjects` directly on action handlers will lose index
 * signature. This method patches the typings.
 */
export const mergeActionHandlers = mergeUniqueObjects as <
  H extends any[],
  S = GetStateFromHandlersList<H>,
  C = IntersectionFromUnion<GetActionCatalogFromHandlersList<H>>
>(
  ...args: H
) => S extends never
  ? IntersectionFromUnion<H[number]>
  : C extends DefaultActionCatalog
  ? ActionHandlers<S, C>
  : IntersectionFromUnion<H[number]>

/**
 * Generate Action Creators with signature:
 * (payload?, meta?) => Action | Function | Promise
 *
 * @param actionHandlers Retux Action Handlers.
 * @param extraAcionCreators Extra Action Creators.
 *                           Can overwrite generated Action Creators.
 *                           Can return Thunk or Promise actions.
 */
export const createActionCreators = createDefaultActionCreators as <
  AH extends {},
  C = GetActionCatalogFromHandlers<AH>,
  AC extends
    | { [T: string]: (...args: any[]) => Action<C> | Function | Promise<any> }
    | undefined = undefined
>(
  actionHandlers: AH,
  extraAcionCreators?: AC
) => {
  [T in Extract<Exclude<keyof AH, keyof AC>, keyof C>]: (
    ...args: Extract<'payload', keyof C[T]> extends never
      ? Extract<'meta', keyof C[T]> extends never
        ? []
        : [undefined, C[T][Extract<'meta', keyof C[T]>]]
      : Extract<'meta', keyof C[T]> extends never
      ? [C[T][Extract<'payload', keyof C[T]>]]
      : [
          C[T][Extract<'payload', keyof C[T]>],
          C[T][Extract<'meta', keyof C[T]>]
        ]
  ) => Action<C, T>
} &
  (AC extends undefined ? {} : AC)
