export type IntersectionFromUnion<U> = (U extends any
? (arg: U) => void
: never) extends (arg: infer T) => void
  ? T
  : never

export interface DefaultActionCatalog {
  [type: string]: {
    payload?: any
    meta?: any
  }
}

/**
 * Basic actions configuration.
 * Index as action type.
 * Error type is added by `Action`.
 */
export type ActionCatalog<C extends DefaultActionCatalog> = C

/**
 * Extract action types from a ActionCatalog
 */
export type ActionType<C extends DefaultActionCatalog> = Extract<
  keyof C,
  string
>
