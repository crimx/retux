import { ActionType, DefaultActionHandler } from '../utils'

/**
 * Get basic action types. ({ type, payload?, meta? })
 * @template TCatalog ActionCatalog.
 * @template TType Action type. If ignored a union of all action types will be used.
 */
export type Action<
  TCatalog,
  TType extends keyof TCatalog = keyof TCatalog
> = TType extends ActionType<TCatalog> // generate union
  ? Readonly<
      { type: TType } & Pick<
        TCatalog[TType],
        Extract<'payload' | 'meta', keyof TCatalog[TType]>
      >
    >
  : never

/**
 * Get basic action handler type of a module.
 * @template TState Module state.
 * @template TCatalog ActionCatalog.
 * @template TType Action type.
 */
export type ActionHandler<
  TState,
  TCatalog,
  TType extends keyof TCatalog
> = DefaultActionHandler<TState, Action<TCatalog, TType>>

/**
 * Get all basic action handler types of a module.
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
