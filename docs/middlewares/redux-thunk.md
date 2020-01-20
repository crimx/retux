# Redux Thunk

This is a guide on how to strongly type [Redux Thunk](https://github.com/reduxjs/redux-thunk) in Retux architecture.

## Prerequisites

- [Core Concenpts](../guide/core-concepts.md)
- [Directory Structure](../guide/directory-structure.md)
- [React Retux](../guide/react-retux.md)

## Define Action and Dispatch with Thunk

First we define Action and Dispatch types specifically for Redux Thunk.

```typescript
// src/retux-store/index.ts
import thunk, {
  ThunkAction as CreateThunkAction,
  ThunkDispatch as CreateThunkDispatch
} from 'redux-thunk'

// Optionally extra args
export const thunkExtraArgs = {
  env: 'xxxx'
}

export type ThunkExtraArgs = typeof thunkExtraArgs

export type ThunkAction<
  Type extends StoreActionType = StoreActionType,
  Result = void
> = CreateThunkAction<
  Result,
  StoreState,
  ThunkExtraArgs,
  Action<StoreActionCatalog, Type>
>

export type StoreDispatch<
  Type extends StoreActionType = StoreActionType
> = CreateThunkDispatch<StoreState, ThunkExtraArgs, StoreAction<Type>>
```

Now we can pass `ThunkAction` around to define custom action creators.

```typescript
const incrementDelay = (
  step: number,
  delay: number
): ThunkAction => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'INCREMENT', payload: step })
  }, delay)
}
```

We can also restrict the dispatchable action types.

```typescript
export const incrementDelayRestrict = (
  step: number,
  delay: number
): ThunkAction<'INCREMENT'> => dispatch => {
  // can only dispatch 'INCREMENT' type.
  setTimeout(() => {
    dispatch({ type: 'INCREMENT', payload: step })
  }, delay)
}
```

## Containers

Since we have mixed action types we won't use the default `MapDispatchToProps` in [React Retux](../guide/react-retux.md) which is meant for the default actions. Here we use the more primitive `MapDispatchToPropsFunction` or `MapDispatchToPropsObject` and feed our own action types.

### Function Form

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
  StoreAction | ThunkAction,
  CounterProps,
  Dispatchers
> = {
  onClick: anActionCreator
}
```
