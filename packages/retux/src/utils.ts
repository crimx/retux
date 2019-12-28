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
 *
 * @template C ActionCatalog
 */
export type CreateActionCatalog<C extends DefaultActionCatalog> = C

/**
 * Extract action types from a ActionCatalog
 *
 * @template C ActionCatalog
 */
export type ActionType<C extends DefaultActionCatalog> = Extract<
  keyof C,
  string
>

/**
 * @template State Store state
 * @template TargetProps Props of the target component
 * @template Dispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template OwnProps Props to the `connect` components
 */
export type MapStateToProps<
  State extends {},
  TargetProps extends {},
  Dispatchers extends keyof TargetProps = never,
  OwnProps = {}
> = (state: State, ownProps: OwnProps) => Omit<TargetProps, Dispatchers>

/**
 * @template State Store state
 * @template TargetProps Props of the target component
 * @template Dispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template OwnProps Props to the `connect` components
 */
export type MapDispatchToProps<
  Action extends {},
  TargetProps extends {},
  Dispatchers extends keyof TargetProps = never,
  OwnProps = {}
> = (
  dispatch: (action: Action) => Action,
  ownProps: OwnProps
) => Pick<TargetProps, Dispatchers>
