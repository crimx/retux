export type IntersectionFromUnion<U> = (U extends any
? (arg: U) => void
: never) extends (arg: infer T) => void
  ? T
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

/**
 * Basic actions configuration.
 * Index as action type.
 * Error type is added by `Action`.
 *
 * @template C ActionCatalog
 */
export type CreateActionCatalog<C extends DefaultActionCatalog> = C

/**
 * Extract action types from a ActionCatalog
 *
 * @template C ActionCatalog
 */
export type ActionType<C> = Extract<keyof C, string>

/**
 * Get action handler type of a module.
 * @template S State.
 * @template A Action.
 */
export type DefaultActionHandler<S extends {}, A extends DefaultAction> = (
  state: Readonly<S>,
  action: A
) => Readonly<S>

/**
 * Get all action handler types of a module.
 * @template S Module state.
 * @template C Module ActionCatalog.
 */
export type DefaultActionHandlers<S extends {}> = {
  readonly [K: string]: DefaultActionHandler<S, DefaultAction>
}
