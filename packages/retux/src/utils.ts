export const { hasOwnProperty } = Object.prototype

export type IntersectionFromUnion<TUnion> = (TUnion extends any
? (arg: TUnion) => void
: never) extends (arg: infer TArg) => void
  ? TArg
  : never

export interface DefaultActionCatalog {
  [type: string]: {
    payload?: any
    meta?: any
    error?: any
  }
}

export interface DefaultAction {
  type: string
}

export type DefaultActionCreator = (...args: any) => DefaultAction
export type DefaultActionCreators = {
  readonly [type: string]: DefaultActionCreator
}
export type CreateDefaultActionCreator = (type: string) => DefaultActionCreator

export type MixedActionCreator = (...args: any) => any
export type MixedActionCreators = {
  readonly [type: string]: MixedActionCreator
}
export type CreateMixedActionCreator = (type: string) => MixedActionCreator

/**
 * Basic actions configuration.
 * Index as action type.
 * Error type is added by `Action`.
 *
 * @template TCatalog ActionCatalog
 */
export type CreateActionCatalog<
  TCatalog extends DefaultActionCatalog
> = TCatalog

/**
 * Extract action types from a ActionCatalog
 *
 * @template TCatalog ActionCatalog
 */
export type ActionType<TCatalog> = Extract<keyof TCatalog, string>

/**
 * Get action handler type of a module.
 * @template TState State.
 * @template TAction Action.
 */
export type DefaultActionHandler<
  TState extends {},
  TAction extends DefaultAction
> = (state: Readonly<TState>, action: TAction) => Readonly<TState>

/**
 * Get all action handler types of a module.
 * @template TState Module state.
 */
export type DefaultActionHandlers<TState extends {}> = {
  readonly [key: string]: DefaultActionHandler<TState, DefaultAction>
}
