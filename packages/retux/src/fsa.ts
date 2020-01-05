import { ActionType, DefaultActionHandler } from './utils'
import { createActionCreators as createDefaultActionCreators } from './create-action-creators'

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
 * Generate Action Creators with signature:
 * (payload?, meta?, error?) => Action | Function | Promise
 *
 * @param actionHandlers Retux Action Handlers.
 * @param extraAcionCreators Extra Action Creators.
 *                           Can overwrite generated Action Creators.
 *                           Can return Thunk or Promise actions.
 */
export const createActionCreators = createDefaultActionCreators as <
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
