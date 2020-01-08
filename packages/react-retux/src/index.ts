/**
 * Specify dispatchers of the connected Component props.
 * This helper if for preventing typos.
 *
 * @template TTargetProps Props of the target component
 * @template TDispatchers Dispatchers keys of TargetProps
 */
export type ExtractDispatchers<
  TTargetProps extends {},
  TDispatchers extends keyof TTargetProps
> = TDispatchers

/**
 * @template TState Store state
 * @template TTargetProps Props of the target component
 * @template TDispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template TOwnProps Props to the `connect` components
 */
export type MapStateToProps<
  TState extends {},
  TTargetProps extends {},
  TDispatchers extends keyof TTargetProps = never,
  TOwnProps = {}
> = (state: TState, ownProps: TOwnProps) => Omit<TTargetProps, TDispatchers>

/**
 * Function form of the `mapDispatchToProps`.
 *
 * This is mainly for libraries that extend the action types.
 * e.g. Redux Thunk and Redux Promise.
 *
 * @template TDispatch Dispatch function.
 * @template TTargetProps Props of the target component
 * @template TDispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template TOwnProps Props to the `connect` components
 */
export type MapDispatchToPropsFunction<
  TDispatch extends (...args: any) => any = <TType extends { type: string }>(
    action: TType
  ) => TType,
  TTargetProps extends {} = {},
  TDispatchers extends keyof TTargetProps = never,
  TOwnProps = {}
> = (
  dispatch: TDispatch,
  ownProps: TOwnProps
) => Pick<TTargetProps, TDispatchers>

/**
 * Object form of the `mapDispatchToProps`.
 *
 * @template TAction Action. Add function or promise accordingly if with middlewares.
 * @template TTargetProps Props of the target component
 * @template TDispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template TOwnProps Props to the `connect` components
 */
export type MapDispatchToPropsObject<
  TAction extends {},
  TTargetProps extends {},
  TDispatchers extends keyof TTargetProps = never
> = {
  [TKey in TDispatchers]: TTargetProps[TKey] extends (...args: any) => any
    ? (...args: Parameters<TTargetProps[TKey]>) => TAction
    : never
}

/**
 * Use this if your actions are all of type `{ type: string, ... }`.
 * Otherwise use [[MapDispatchToPropsFunction]] or [[MapDispatchToPropsObject]]
 * to specify custom action types.
 *
 * @template TAction Action. Add function or promise accordingly if with middlewares.
 * @template TTargetProps Props of the target component
 * @template TDispatchers Union of target component props property names that
 *                    are for `mapDispatchToProps`
 * @template TOwnProps Props to the `connect` components
 */
export type MapDispatchToProps<
  TAction extends { type: string },
  TTargetProps extends {},
  TDispatchers extends keyof TTargetProps = never,
  TOwnProps = {}
> =
  | MapDispatchToPropsFunction<
      <TType extends TAction>(action: TType) => TType,
      TTargetProps,
      TDispatchers,
      TOwnProps
    >
  | MapDispatchToPropsObject<TAction, TTargetProps, TDispatchers>
