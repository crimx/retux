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
 * @template Action Action. Add function or promise accordingly if with middlewares.
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
> =
  | ((
      dispatch: <T extends Action>(action: T) => T,
      ownProps: OwnProps
    ) => Pick<TargetProps, Dispatchers>)
  | {
      [K in Dispatchers]: (...args: any[]) => Action
    }
