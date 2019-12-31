import { DefaultActionCatalog, ActionType, DefaultActionHandler } from './utils'
import { createReducer as createDefaultReducer } from './create-reducer'
import { createActionCreators as createDefaultActionCreators } from './create-action-creators'

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
  T extends keyof C = ActionType<C>
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
  T extends keyof C
> = DefaultActionHandler<S, Action<C, T>>

/**
 * Get all FSA compliant action handler types of a module.
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
 * (payload?, meta?, error?) => Action | Function | Promise
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
        ?
            | []
            | [undefined, undefined, false]
            | [ActionError<C, T>['payload'], undefined, true]
        :
            | [undefined, C[T]['meta']]
            | [undefined, C[T]['meta'], false]
            | [ActionError<C, T>['payload'], C[T]['meta'], true]
      : Extract<'meta', keyof C[T]> extends never
      ?
          | [C[T]['payload']]
          | [C[T]['payload'], undefined, false]
          | [ActionError<C, T>['payload'], undefined, true]
      :
          | [C[T]['payload'], C[T]['meta']]
          | [C[T]['payload'], C[T]['meta'], false]
          | [ActionError<C, T>['payload'], C[T]['meta'], true]
  ) => Action<C, T>
} &
  (AC extends undefined ? {} : AC)
