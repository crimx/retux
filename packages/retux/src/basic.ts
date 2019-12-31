import { DefaultActionCatalog, ActionType, DefaultActionHandler } from './utils'
import { createReducer as createDefaultReducer } from './create-reducer'

/**
 * Get basic action types. ({ type, payload?, meta? })
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type Action<
  C extends DefaultActionCatalog = {},
  T extends ActionType<C> = ActionType<C>
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
  T extends ActionType<C>
> = DefaultActionHandler<S, Action<C, T>>

/**
 * Get all basic action handler types of a module.
 * @template S Module state.
 * @template C Module ActionCatalog.
 */
export type ActionHandlers<S extends {}, C extends DefaultActionCatalog> = {
  [K in ActionType<C>]: ActionHandler<S, C, K>
}

export const createReducer: <S extends {}, C extends DefaultActionCatalog>(
  initialState: S,
  handlers: ActionHandlers<S, C>
) => (state: S | undefined, action: Action<C>) => S = createDefaultReducer
