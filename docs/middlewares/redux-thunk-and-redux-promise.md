# Redux Thunk and Redux Promise

This is a guide on how to strongly type [Redux Thunk](https://github.com/reduxjs/redux-thunk) and [Redux Promsie](https://github.com/redux-utilities/redux-promise) together in Retux architecture.

## Prerequisites

- [Core Concenpts](../guide/core-concepts.md)
- [Directory Structure](../guide/directory-structure.md)
- [React Retux](../guide/react-retux.md)
- [Redux Thunk with Retux](../redux-thunk.md)
- [Redux Promise with Retux](../redux-promise.md)

## Define Action and Dispatch with Promise

Since we have Promise, you might want to dispatch Promise with Thunk `dispatch`.

```typescript
// src/retux-store/modules/index.ts
export type PromiseAction<
  Type extends StoreActionType = StoreActionType
> = Promise<StoreAction<Type>>

export interface StoreDispatch<Type extends StoreActionType = StoreActionType> {
  <T extends StoreAction>(action: T): T
  <P extends PromiseAction<Type>>(promiseAction: P): P
  <R>(thunkAction: ThunkActionWithPromise<Type, R>): R
}

export type ThunkActionWithPromise<
  Type extends StoreActionType = StoreActionType,
  Result = void
> = (
  dispatch: StoreDispatch<Type>,
  getState: () => StoreState,
  extraArgument: ThunkExtraArgs
) => Result
```

Now we can pass `StoreAction`, `PromiseAction` and `ThunkActionWithPromise` around to define custom action creators.

## Containers

Since we have mixed action types we won't use the default `MapDispatchToProps` in [React Retux](../guide/react-retux.md) which is meant for the default actions. Here we use the more primitive `MapDispatchToPropsFunction` or `MapDispatchToPropsObject` and feed our own action types.

### Function Form

This is the same with the Redux Thunk and Redux Promise guide.

```typescript
import { MapDispatchToPropsFunction } from 'react-retux'

const mapDispatchToProps = MapDispatchToPropsFunction<
  StoreDispatch,
  CounterProps,
  Dispatchers
> = dispatch => ({
  onClick: event => {
    dispatch(action.COUNTER$NEW_VAL(event.currentTarget.value))
  }
})
```

### Object Form

Note that you can also just feed Action types that are needed by the Component.

```typescript
import { MapDispatchToPropsObject } from 'react-retux'

const mapDispatchToProps = MapDispatchToPropsObject<
  StoreAction | PromiseAction | ThunkActionWithPromise,
  CounterProps,
  Dispatchers
> = {
  onClick: anActionCreator
}
```
