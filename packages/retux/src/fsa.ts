import { ActionType, DefaultActionHandler, DefaultActionCatalog } from './utils'
import {
  createActionCreators as createDefaultActionCreators,
  ActionCreator as DefaultActionCreator
} from './create-action-creators'

/**
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type ActionError<C, T extends keyof C = ActionType<C>> = Readonly<
  {
    type: T
    error: true
    payload: Extract<'error', keyof C[T]> extends never
      ? Error
      : C[T][Extract<'error', keyof C[T]>]
  } & Pick<C[T], Extract<'meta', keyof C[T]>>
>

/**
 * Get FSA compliant action types. ({ type, payload?, meta?, error? })
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type Action<C, T extends keyof C = ActionType<C>> = T extends ActionType<
  C
>
  ?
      | Readonly<
          // prettier-ignore
          { type: T, error?: false } &
          Pick<C[T], Extract<'payload' | 'meta', keyof C[T]>>
        >
      | ActionError<C, T>
  : never

/**
 * Get FSA compliant action handler type.
 * @template S Module state.
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type ActionHandler<S, C, T extends keyof C> = DefaultActionHandler<
  S,
  Action<C, T>
>

/**
 * Get all FSA compliant action handler types of a module.
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
 * (payload?, error?, meta?) => Action
 * ```
 * (depending on each Action)
 *
 */
export type ActionCreator<TCatalog, TType extends keyof TCatalog> = (
  ...args: Extract<'payload', keyof TCatalog[TType]> extends never
    ? Extract<'meta', keyof TCatalog[TType]> extends never
      ?
          | []
          | [undefined, false]
          | [ActionError<TCatalog, TType>['payload'], true]
      :
          | [
              undefined,
              false,
              TCatalog[TType][Extract<'meta', keyof TCatalog[TType]>]
            ]
          | [
              ActionError<TCatalog, TType>['payload'],
              true,
              TCatalog[TType][Extract<'meta', keyof TCatalog[TType]>]
            ]
    : Extract<'meta', keyof TCatalog[TType]> extends never
    ?
        | [TCatalog[TType][Extract<'payload', keyof TCatalog[TType]>]]
        | [TCatalog[TType][Extract<'payload', keyof TCatalog[TType]>], false]
        | [ActionError<TCatalog, TType>['payload'], true]
    :
        | [
            TCatalog[TType][Extract<'payload', keyof TCatalog[TType]>],
            false,
            TCatalog[TType][Extract<'meta', keyof TCatalog[TType]>]
          ]
        | [
            ActionError<TCatalog, TType>['payload'],
            true,
            TCatalog[TType][Extract<'meta', keyof TCatalog[TType]>]
          ]
) => Action<TCatalog, TType>

/**
 * Generate single Action Creator with signature:
 * (depending on each Action)
 * ```
 * (payload?, error?, meta?) => Action
 * ```
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
export function createActionCreator<
  TCatalog = DefaultActionCatalog,
  TType extends keyof TCatalog = keyof TCatalog
>(type: TType) {
  return (...args: any): unknown => {
    switch (args.length) {
      case 0:
        return { type }
      case 1:
        return { type, payload: args[0] }
      case 2:
        return { type, payload: args[0], error: args[1] }
      default:
        return { type, payload: args[0], error: args[1], meta: args[2] }
    }
  }
}

/**
 * Generate Action Creators with signature:
 * (payload?, error?, meta?) => Action
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

/**
 * Generate Action Creators with signature:
 * (payload?, meta?, error?) => Action | Function | Promise
 *
 * @param actionHandlers Retux Action Handlers.
 * @param extraAcionCreators Extra Action Creators.
 *                           Can overwrite generated Action Creators.
 *                           Can return Thunk or Promise actions.
 */
export const createActionCreatorsx = createDefaultActionCreators as <
  AH extends {},
  AC extends {},
  C = GetActionCatalogFromHandlers<AH>
>(
  actionHandlers: AH,
  extraAcionCreators?: AC
) => (C extends never
  ? AH
  : {
      [T in Extract<Exclude<keyof AH, keyof AC>, keyof C>]: (
        ...args: Extract<'payload', keyof C[T]> extends never
          ? Extract<'meta', keyof C[T]> extends never
            ?
                | []
                | [undefined, undefined, false]
                | [ActionError<C, T>['payload'], undefined, true]
            :
                | [undefined, C[T][Extract<'meta', keyof C[T]>]]
                | [undefined, C[T][Extract<'meta', keyof C[T]>], false]
                | [
                    ActionError<C, T>['payload'],
                    C[T][Extract<'meta', keyof C[T]>],
                    true
                  ]
          : Extract<'meta', keyof C[T]> extends never
          ?
              | [C[T][Extract<'payload', keyof C[T]>]]
              | [C[T][Extract<'payload', keyof C[T]>], undefined, false]
              | [ActionError<C, T>['payload'], undefined, true]
          :
              | [
                  C[T][Extract<'payload', keyof C[T]>],
                  C[T][Extract<'meta', keyof C[T]>]
                ]
              | [
                  C[T][Extract<'payload', keyof C[T]>],
                  C[T][Extract<'meta', keyof C[T]>],
                  false
                ]
              | [
                  ActionError<C, T>['payload'],
                  C[T][Extract<'meta', keyof C[T]>],
                  true
                ]
      ) => Action<C, T>
    }) &
  (AC extends undefined ? {} : AC)
