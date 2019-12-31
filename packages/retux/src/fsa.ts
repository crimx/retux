import { DefaultActionCatalog, ActionType, DefaultActionHandler } from './utils'
import { createReducer as createDefaultReducer } from './create-reducer'

/**
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type ActionError<
  C extends DefaultActionCatalog,
  T extends keyof C = ActionType<C>
> = Readonly<
  {
    type: T
    error: true
    payload: Extract<'error', keyof C[T]> extends never ? Error : C[T]['error']
  } & Pick<C[T], Extract<'meta', keyof C[T]>>
>

/**
 * Get FSA compliant action types. ({ type, payload?, meta?, error? })
 * @template C ActionCatalog.
 * @template T Action type. If ignored a union of all action types will be used.
 */
export type Action<
  C extends DefaultActionCatalog,
  T extends ActionType<C> = ActionType<C>
> = T extends ActionType<C>
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
export type ActionHandler<
  S extends {},
  C extends DefaultActionCatalog,
  T extends ActionType<C>
> = DefaultActionHandler<S, Action<C, T>>

/**
 * Get all FSA compliant action handler types of a module.
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
