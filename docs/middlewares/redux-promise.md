# Redux Promise

This is a guide on how to strongly type [Redux Promsie](https://github.com/redux-utilities/redux-promise) in Retux architecture.

## Prerequisites

- [Core Concenpts](../guide/core-concepts.md)
- [Directory Structure](../guide/directory-structure.md)
- [React Retux](../guide/react-retux.md)

## Define Action and Dispatch with Promise

First we define Action and Dispatch types specifically for Redux Promise.

```typescript
// src/retux-store/modules/index.ts
export type PromiseAction<
  Type extends StoreActionType = StoreActionType
> = Promise<StoreAction<Type>>

export interface StoreDispatch<Type extends StoreActionType = StoreActionType> {
  <T extends StoreAction>(action: T): T
  <P extends Promise<StoreAction<Type>>>(promiseAction: P): P
}
```

Now we can pass `PromiseAction` around to define custom action creators.

```typescript
const incrementDelay = (
  step: number,
  delay: number
): PromiseAction =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ type: 'INCREMENT', payload: step })
    }, delay)
  })
```

We can also restrict the dispatchable action types.

```typescript
const incrementDelay = (
  step: number,
  delay: number
): PromiseAction<'INCREMENT'> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ type: 'INCREMENT', payload: step })
    }, delay)
  })
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
  StoreAction | PromiseAction,
  CounterProps,
  Dispatchers
> = {
  onClick: anActionCreator
}
```
