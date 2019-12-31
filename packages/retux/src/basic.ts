import { DefaultActionCatalog, ActionType, DefaultActionHandler } from './utils'
import { createReducer as createDefaultReducer } from './create-reducer'
import { createActionCreators as createDefaultActionCreators } from './create-action-creators'

/**
 * Get basic action types. ({ type, payload?, meta? })
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type Action<
  C extends DefaultActionCatalog = {},
  T extends keyof C = ActionType<C>
> = T extends ActionType<C> // generate union
  ? Readonly<{ type: T } & Pick<C[T], Extract<'payload' | 'meta', keyof C[T]>>>
  : never

/**
 * Get basic action handler type of a module.
 * @template S Module state.
 * @template C ActionCatalog.
 * @template T Action type.
 */
export type ActionHandler<
  S extends {},
  C extends DefaultActionCatalog,
  T extends keyof C
> = DefaultActionHandler<S, Action<C, T>>

/**
 * Get all basic action handler types of a module.
 * @template S Module state.
 * @template C Module ActionCatalog.
 */
export type ActionHandlers<S extends {}, C extends DefaultActionCatalog> = {
  readonly [K in ActionType<C>]: ActionHandler<S, C, K>
}

/**
 * @template H ActionHandlers
 */
type GetActionCatalog<H> = H extends ActionHandlers<infer S, infer C> ? C : H

export const createReducer: <S extends {}, C extends DefaultActionCatalog>(
  initialState: S,
  handlers: ActionHandlers<S, C>
) => (state: S | undefined, action: Action<C>) => S = createDefaultReducer

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
  C extends DefaultActionCatalog = GetActionCatalog<AH>,
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
        : [undefined, C[T]['meta']]
      : Extract<'meta', keyof C[T]> extends never
      ? [C[T]['payload']]
      : [C[T]['payload'], C[T]['meta']]
  ) => Action<C, T>
} &
  (AC extends undefined ? {} : AC)
