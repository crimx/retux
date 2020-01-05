/**
 * Specify dispatchers of the connected Component props.
 * This helper if for preventing typos.
 *
 * @template TargetProps Props of the target component
 * @template Dispatchers Dispatchers keys of TargetProps
 */
export type ExtractDispatchers<
  TargetProps extends {},
  Dispatchers extends keyof TargetProps
> = Dispatchers

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
 * Function form of the `mapDispatchToProps`.
 *
 * This is mainly for libraries that extend the action types.
 * e.g. Redux Thunk and Redux Promise.
 *
 * @template Dispatch Dispatch function.
 * @template TargetProps Props of the target component
 * @template Dispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template OwnProps Props to the `connect` components
 */
export type MapDispatchToPropsFunction<
  Dispatch extends (...args: any) => any = <T extends { type: string }>(
    action: T
  ) => T,
  TargetProps extends {} = {},
  Dispatchers extends keyof TargetProps = never,
  OwnProps = {}
> = (dispatch: Dispatch, ownProps: OwnProps) => Pick<TargetProps, Dispatchers>

/**
 * Object form of the `mapDispatchToProps`.
 *
 * @template Action Action. Add function or promise accordingly if with middlewares.
 * @template TargetProps Props of the target component
 * @template Dispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template OwnProps Props to the `connect` components
 */
export type MapDispatchToPropsObject<
  Action extends {},
  TargetProps extends {},
  Dispatchers extends keyof TargetProps = never
> = {
  [K in Dispatchers]: TargetProps[K] extends (...args: any) => any
    ? (...args: Parameters<TargetProps[K]>) => Action
    : never
}

/**
 * Use this if your actions are all of type `{ type: string, ... }`.
 * Otherwise use [[MapDispatchToPropsFunction]] or [[MapDispatchToPropsObject]]
 * to specify custom action types.
 *
 * @template Action Action. Add function or promise accordingly if with middlewares.
 * @template TargetProps Props of the target component
 * @template Dispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template OwnProps Props to the `connect` components
 */
export type MapDispatchToProps<
  Action extends { type: string },
  TargetProps extends {},
  Dispatchers extends keyof TargetProps = never,
  OwnProps = {}
> =
  | MapDispatchToPropsFunction<
      <T extends Action>(action: T) => T,
      TargetProps,
      Dispatchers,
      OwnProps
    >
  | MapDispatchToPropsObject<Action, TargetProps, Dispatchers>
