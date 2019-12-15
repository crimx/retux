import { DefaultActionCatalog, ActionType } from './utils'
export { ActionCatalog, ActionType } from './utils'

/**
 * Get FSA compliant action types. ({ type, payload?, meta?, error? })
 * @param C ActionCatalog.
 * @param T Action type. If ignored a union of all action types will be used.
 */
export type Action<
  C extends DefaultActionCatalog,
  T extends ActionType<C> = ActionType<C>
> = T extends any
  ?
      | Readonly<
          // prettier-ignore
          { type: T, error?: false } &
          ('payload' extends keyof C[T] ? Pick<C[T], 'payload'> : { payload?: undefined }) &
          ('meta' extends keyof C[T] ? Pick<C[T], 'meta'> : { meta?: undefined })
        >
      | Readonly<
          // prettier-ignore
          { type: T, error: true, payload: Error } &
          ('meta' extends keyof C[T] ? Pick<C[T], 'meta'> : { meta?: undefined })
        >
  : never

/**
 * Get FSA compliant action handler type.
 * @param C ActionCatalog.
 * @param S Module state.
 * @param T Action type. If ignored a union of all action types will be used.
 */
export type ActionHandler<
  C extends DefaultActionCatalog,
  S extends {},
  T extends ActionType<C>
> = (state: Readonly<S>, action: Action<C, T>) => Readonly<S>

/**
 * Get all FSA compliant action handler types of a module.
 * @param C Module ActionCatalog.
 * @param S Module state.
 * @param SC Optional. ActionCatalog of all modules or other modules. This will
 *           generate optional action handlers for other modules.
 */
export type ActionHandlers<
  C extends DefaultActionCatalog,
  S extends {},
  SC extends {} = {}
> = {
  [K in ActionType<C>]: ActionHandler<C, S, K>
} &
  {
    [K in ActionType<Omit<SC, keyof C>>]?: ActionHandler<SC, S, K>
  }

export const createReducer = <
  C extends DefaultActionCatalog,
  S extends {},
  SC extends DefaultActionCatalog = {}
>(
  initialState: S,
  handlers: ActionHandlers<C, S, SC>
) =>
  function reducer(state = initialState, action: Action<C>): S {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type as string](state, action)
    } else {
      return state
    }
  }
