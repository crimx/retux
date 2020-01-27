# React Retux API Reference

## ExtractDispatchers

```typescript
Ƭ ExtractDispatchers<TTargetProps, TDispatchers>: TDispatchers
```

Specify dispatchers of the connected Component props.

This helper is for typo prevention.

**Type parameters:**

- `TTargetProps` Target Component Props.
- `TDispatchers` Props properties that will `dispatch` Redux Actions.


## MapStateToProps

```typescript
Ƭ MapStateToProps<TState, TTargetProps, TDispatchers, TOwnProps>:
    (state: TState, ownProps: TOwnProps) => Omit<TTargetProps, TDispatchers>
```

Specify dispatchers of the connected Component props.

This helper is for preventing typos.

**Type parameters:**

- `TState` Store state.
- `TTargetProps` Target Component Props.
- `TDispatchers` Props properties that will `dispatch` Redux Actions.
- `TOwnProps` Container Component Own Props.

## MapDispatchToPropsFunction

```typescript
Ƭ MapDispatchToPropsFunction<TDispatch, TTargetProps, TDispatchers, TOwnProps>:
    (dispatch: TDispatch, ownProps: TOwnProps) => Pick<TTargetProps, TDispatchers>
```

Function form of the `mapDispatchToProps`.

This is mainly for libraries that extend the action types.
e.g. Redux Thunk and Redux Promise.

**Type parameters:**

- `TDispatch` Custom Redux `Dispatch` type.
- `TTargetProps` Target Component Props.
- `TDispatchers` Props properties that will `dispatch` Redux Actions.
- `TOwnProps` Container Component Own Props.

## MapDispatchToPropsObject

```typescript
Ƭ MapDispatchToPropsObject<TAction, TTargetProps, TDispatchers>:
    { [TKey in TDispatchers]: [Action Creators] }
```

Object form of the `mapDispatchToProps`.

This is mainly for libraries that extend the action types.
e.g. Redux Thunk and Redux Promise.

**Type parameters:**

- `TAction` Actions. Add Thunk Action or Promise Action accordingly.
- `TTargetProps` Target Component Props.
- `TDispatchers` Props properties that will `dispatch` Redux Actions.

## MapDispatchToProps

```typescript
Ƭ MapDispatchToProps<TAction, TTargetProps, TDispatchers, TOwnProps>: 
    MapDispatchToPropsFunction | MapDispatchToPropsObject
```

This is for Actions are all of type `{ type: string, ... }`.

Otherwise use [MapDispatchToPropsFunction](#mapdispatchtopropsfunction) or [MapDispatchToPropsObject](#mapdispatchtopropsobject) for mixed action types.

**Type parameters:**

- `TAction` Actions. Add Thunk Action or Promise Action accordingly.
- `TTargetProps` Target Component Props.
- `TDispatchers` Props properties that will `dispatch` Redux Actions.
- `TOwnProps` Container Component Own Props.
