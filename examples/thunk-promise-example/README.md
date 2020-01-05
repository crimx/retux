# Retux Redux-Thunk and Redux-Promise Example

This example shows the ability of mixing other action types in Retux while still maintaining strongly-typed.

## Usage

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

## Highlights

It is recommended to read the core concept of Retux first for better understanding.

### Redux-Thunk Setup

With simple setup like this:

```typescript
import thunk, {
  ThunkAction as CreateThunkAction,
  ThunkDispatch as CreateThunkDispatch
} from 'redux-thunk'

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

export type ThunkDispatch<
  Type extends StoreActionType = StoreActionType
> = CreateThunkDispatch<StoreState, ThunkExtraArgs, StoreAction<Type>>
```

Now we can pass `ThunkAction` around to write action creators.

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

### Redux-Promise Setup

No additional setup. Just write your action creators:

```typescript
export const incrementDelayPromise = (
  step: number,
  delay: number
): Promise<StoreAction<'INCREMENT'>> =>
  new Promise(resolve =>
    setTimeout(() => resolve({ type: 'INCREMENT', payload: step }), delay)
  )
```

### Redux-Thunk with Redux-Promise Setup

If you need to dispatch Promise within thunk.

```typescript
export interface StoreDispatch<Type extends StoreActionType = StoreActionType> {
  <T extends StoreAction>(action: T): T
  <P extends Promise<StoreAction<Type>>>(promiseAction: P): P
  <R>(thunkAction: ThunkAction<Type, R>): R
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

So the action creators look like:

```typescript
export const incrementDelayThunkPromise = (
  step: number,
  delay: number
): ThunkActionWithPromise<'INCREMENT'> => dispatch => {
  dispatch({ type: 'INCREMENT', payload: step })
  dispatch(
    new Promise<StoreAction<'INCREMENT'>>(resolve =>
      setTimeout(() => resolve({ type: 'INCREMENT', payload: step }), delay)
    )
  )
}
```

### Connect

As for Containers, Retux offers [React Retux](https://github.com/crimx/retux/tree/master/packages/react-retux)(why not...) for enhancing React-Redux. It can prevent missing props and typos.

#### Dispatchers

Pick dispatchers from Target Component props.

```typescript
import { ExtractDispatchers } from 'react-retux'

type Dispatchers = ExtractDispatchers<CounterProps, 'onClick'>
```

#### Map State To Props

The rest of the props keys are mandatory for state mapping.

```typescript
import { MapStateToProps } from 'react-retux'

const mapStateToProps: MapStateToProps<
  StoreState,
  CounterProps,
  Dispatchers
> = state => ({
  count: state.count
})
```

#### Map Dispatch To Props

Since we have mutated action types we won't use the default `MapDispatchToProps` which is meant for the default actions. Here we use the more primitive `MapDispatchToPropsFunction` or `MapDispatchToPropsObject` and feed our own action types.

```typescript
import { MapDispatchToPropsFunction } from 'react-retux'

const mapDispatchToProps = MapDispatchToPropsFunction<
  StoreDispatch, // See above
  CounterProps,
  Dispatchers
> = dispatch => ({
  onClick: (...) => {
    dispatch(...)
  }
})
```

Or the object form:

```typescript
import { MapDispatchToPropsObject } from 'react-retux'

const mapDispatchToProps = MapDispatchToPropsObject<
  StoreAction | ThunkActionWithPromise | Promise<StoreAction>,
  CounterProps,
  Dispatchers
> = {
  onClick: anActionCreator
}
```
