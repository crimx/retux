import { DefaultActionCatalog, ActionType } from './utils'
export { CreateActionCatalog, ActionType } from './utils'

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
> = (state: Readonly<S>, action: Action<C, T>) => Readonly<S>

/**
 * Get all basic action handler types of a module.
 * @template S Module state.
 * @template C Module ActionCatalog.
 */
export type ActionHandlers<S extends {}, C extends DefaultActionCatalog> = {
  [K in ActionType<C>]: ActionHandler<S, C, K>
}

export const createReducer = <S extends {}, C extends DefaultActionCatalog>(
  initialState: S,
  handlers: ActionHandlers<S, C>
) =>
  function reducer(state: S = initialState, action: Action<C>): S {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](
        state,
        action as Action<C, typeof action.type>
      )
    } else {
      return state
    }
  }
