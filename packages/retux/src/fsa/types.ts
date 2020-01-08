import { ActionType, DefaultActionHandler } from '../utils'

/**
 * @template TCatalog ActionCatalog.
 * @template TType Action type. If ignored a union of all action types will be used.
 */
export type ActionError<
  TCatalog,
  TType extends keyof TCatalog = ActionType<TCatalog>
> = Readonly<
  {
    type: TType
    error: true
    payload: Extract<'error', keyof TCatalog[TType]> extends never
      ? Error
      : TCatalog[TType][Extract<'error', keyof TCatalog[TType]>]
  } & Pick<TCatalog[TType], Extract<'meta', keyof TCatalog[TType]>>
>

/**
 * Get FSA compliant action types. ({ type, payload?, meta?, error? })
 * @template TCatalog ActionCatalog.
 * @template TType Action type. If ignored a union of all action types will be used.
 */
export type Action<
  TCatalog,
  TType extends keyof TCatalog = ActionType<TCatalog>
> = TType extends ActionType<TCatalog>
  ?
      | Readonly<
          // prettier-ignore
          { type: TType, error?: false } &
          Pick<TCatalog[TType], Extract<'payload' | 'meta', keyof TCatalog[TType]>>
        >
      | ActionError<TCatalog, TType>
  : never

/**
 * Get FSA compliant action handler type.
 * @template TState Module state.
 * @template TCatalog ActionCatalog.
 * @template TType Action type. If ignored a union of all action types will be used.
 */
export type ActionHandler<
  TState,
  TCatalog,
  TType extends keyof TCatalog
> = DefaultActionHandler<TState, Action<TCatalog, TType>>

/**
 * Get all FSA compliant action handler types of a module.
 * @template TState Module state.
 * @template TCatalog Module ActionCatalog.
 */
export type ActionHandlers<TState, TCatalog> = {
  readonly [TType in keyof TCatalog]: ActionHandler<TState, TCatalog, TType>
}

/**
 * Extract ActionCatalog from ActionHandlers
 *
 * @template THandlers ActionHandlers
 */
export type GetActionCatalogFromHandlers<
  THandlers
> = THandlers extends ActionHandlers<infer TState, infer TCatalog>
  ? TCatalog
  : never

/**
 * Extract ActionCatalogs from list of ActionHandlers
 *
 * @template THandler Union of ActionHandler
 */
export type GetActionCatalogFromHandlersList<
  THandler
> = THandler extends ActionHandlers<infer TState, infer TCatalog>
  ? TCatalog
  : never

/**
 * Extract States from List of ActionHandlers
 *
 * @template THandler Union of ActionHandler
 */
export type GetStateFromHandlersList<
  THandler
> = THandler extends ActionHandlers<infer TState, infer TCatalog>
  ? TState
  : never

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
