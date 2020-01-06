import {
  ActionType,
  DefaultActionHandler,
  DefaultActionCatalog,
  DefaultActionCreator,
  hasOwnProperty
} from './utils'

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
 * Using Proxy for lazy creating.
 *
 * Generate Action Creators with signature:
 * (payload?, meta?) => Action
 *
 * @template TCatalog ActionCatalog
 */
export function defineActionCreators<TCatalog = DefaultActionCatalog>(): {
  [key in keyof TCatalog]: ActionCreator<TCatalog, key>
} {
  return new Proxy(
    {} as { [key in keyof TCatalog]: ActionCreator<TCatalog, key> },
    {
      get(obj, type: keyof TCatalog) {
        if (!hasOwnProperty.call(obj, type)) {
          obj[type] = createActionCreator(type)
        }
        return obj[type]
      }
    }
  )
}

/**
 * For environment that does not support Proxy.
 *
 * Generate Action Creators with signature:
 * (payload?, error?, meta?) => Action
 *
 * @param actionHandlers Retux Action Handlers.
 */
export function createActionCreators<
  THandlers extends {},
  TCatalog = GetActionCatalogFromHandlers<THandlers>
>(
  actionHandlers: THandlers
): THandlers extends never
  ? {
      [key in keyof THandlers]: DefaultActionCreator
    }
  : {
      [key in keyof THandlers]: key extends keyof TCatalog
        ? ActionCreator<TCatalog, key>
        : DefaultActionCreator
    }
export function createActionCreators(actionHandlers: {}) {
  const result: { [key: string]: DefaultActionCreator } = {}

  for (const type in actionHandlers) {
    if (hasOwnProperty.call(actionHandlers, type)) {
      result[type] = createActionCreator(type)
    }
  }

  return result
}
