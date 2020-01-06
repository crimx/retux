import { ActionType, DefaultActionHandler, DefaultActionCatalog } from './utils'
import {
  createActionCreators as createDefaultActionCreators,
  ActionCreator as DefaultActionCreator
} from './create-action-creators'

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
 * Extract ActionCatalogs from list of ActionHandlers
 *
 * @template H ActionHandlers
 */
export type GetActionCatalogFromHandlersList<
  HS extends any[],
  H = HS[number]
> = H extends ActionHandlers<infer S, infer C> ? C : never

/**
 * Extract States from List of ActionHandlers
 *
 * @template H ActionHandlers
 */
export type GetStateFromHandlersList<
  HS extends any[],
  H = HS[number]
> = H extends ActionHandlers<infer S, infer C> ? S : never

/**
 * Default type of the generated Action Creator
 * ```
 * (payload?, meta?) => Action
 * ```
 * (depending on each Action)
 *
 */
export type ActionCreator<TCatalog, TType extends keyof TCatalog> = (
  ...args: Extract<'payload', keyof TCatalog[TType]> extends never
    ? Extract<'meta', keyof TCatalog[TType]> extends never
      ? []
      : [undefined, TCatalog[TType][Extract<'meta', keyof TCatalog[TType]>]]
    : Extract<'meta', keyof TCatalog[TType]> extends never
    ? [TCatalog[TType][Extract<'payload', keyof TCatalog[TType]>]]
    : [
        TCatalog[TType][Extract<'payload', keyof TCatalog[TType]>],
        TCatalog[TType][Extract<'meta', keyof TCatalog[TType]>]
      ]
) => Action<TCatalog, TType>

/**
 * Generate single Action Creator
 *
 * @template TCatalog ActionCatalog
 * @template TType Action Type
 *
 * @param type action type
 */
export function createActionCreator<
  TCatalog = DefaultActionCatalog,
  TType extends keyof TCatalog = keyof TCatalog
>(type: TType): ActionCreator<TCatalog, TType>
export function createActionCreator(type: string) {
  return (...args: any[]) => {
    switch (args.length) {
      case 0:
        return { type }
      case 1:
        return { type, payload: args[0] }
      default:
        return { type, payload: args[0], meta: args[1] }
    }
  }
}

/**
 * Generate Action Creators with signature:
 * (payload?, meta?) => Action
 *
 * @param actionHandlers Retux Action Handlers.
 * @param extraAcionCreators Extra Action Creators.
 *                           Can overwrite generated Action Creators.
 */
export function createActionCreators<
  THandlers extends {},
  TExtra extends {},
  TCatalog = GetActionCatalogFromHandlers<THandlers>
>(
  actionHandlers: THandlers,
  extraAcionCreators?: TExtra
): (TCatalog extends never
  ? {
      [key in Exclude<keyof THandlers, keyof TExtra>]: DefaultActionCreator
    }
  : {
      [key in Extract<
        Exclude<keyof THandlers, keyof TExtra>,
        keyof TCatalog
      >]: ActionCreator<TCatalog, key>
    }) &
  (TExtra extends undefined ? {} : TExtra)
export function createActionCreators<THandlers extends {}, TExtra extends {}>(
  actionHandlers: THandlers,
  extraAcionCreators?: TExtra
) {
  return createDefaultActionCreators(
    createActionCreator,
    actionHandlers,
    extraAcionCreators
  )
}
