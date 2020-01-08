# [React Retux](https://github.com/crimx/retux/tree/master/packages/react-retux)

[![npm-version](https://img.shields.io/npm/v/react-retux.svg)](https://www.npmjs.com/package/react-retux)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-retux)](https://bundlephobia.com/result?p=react-retux)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

React-Redux Type enhancement suite.

## Features

- Better intellisense auto-complete and error code highlight.
- Prevent duplicated keys on mapState and mapDispatch.
- Easy to work with mixed action types(Thunk, Promise...).
- Designed for Retux architecture but can be used in any project directly.

## Installation

- yarn: `yarn add react-retux`
- npm: `npm add react-retux`

## API

All typings no JavaScript code.

- `ExtractDispatchers` for picking dispatchable properties from the props of the connected Component.
- `MapStateToProps` for strongly typing the `mapStateToProps` function.
- `MapDispatchToProps` for strongly typing `mapDsipatchToProps` with normal actions(in the form of `{ type: string, ... }`).
- `MapDispatchToPropsFunction` and `MapDispatchToPropsObject` are what `MapDispatchToProps` uses under the hood. You want to use them directly when you have mixed action types(like Redux-Thunk and Redux-Promise).

## Examples

See [Tests](https://github.com/crimx/retux/tree/master/packages/react-retux/__tests__) and [Retux Examples](https://github.com/crimx/retux/tree/master/examples), specifically [thunk-promise-example](https://github.com/crimx/retux/tree/master/examplesthunk-promise-example).

## Highlights

For mixed action types, with `MapDispatchToPropsFunction`:

```typescript
// src/retux-store/index.ts

export interface StoreDispatch<Type extends StoreActionType = StoreActionType> {
  <T extends StoreAction>(action: T): T
  <P extends Promise<StoreAction<Type>>>(promiseAction: P): P
  <R>(thunkAction: ThunkActionWithPromise<Type, R>): R
}

// Dispatch Promise inside thunk.
export type ThunkActionWithPromise<
  Type extends StoreActionType = StoreActionType,
  Result = void
> = (
  dispatch: StoreDispatch<Type>,
  getState: () => StoreState,
  extraArgument: ThunkExtraArgs
) => Result
```

```typescript
// src/containers/ComponentA.tsx

import { MapDispatchToPropsFunction } from 'react-retux'
import { ComponentA, ComponentAProps } from '../components/ComponentA.tsx'
import { StoreDispatch } from '../retux-store'

type Dispatchers = ExtractDispatchers<ComponentAProps, 'onClick'>

const mapDispatchToProps = MapDispatchToPropsFunction<
  StoreDispatch,
  ComponentAProps,
  Dispatchers
> = dispatch => ({
  onClick: (...) => {
    dispatch(...)
  }
})
```

Or with `MapDispatchToPropsObject`:

```typescript
// src/containers/ComponentA.tsx

import { MapDispatchToPropsObject } from 'react-retux'
import { ComponentA, ComponentAProps } from '../components/ComponentA.tsx'
import { StoreAction, ThunkActionWithPromise } from '../retux-store'
import { anActionCreator } from '../retux-store/actions'

type Dispatchers = ExtractDispatchers<ComponentAProps, 'onClick'>

const mapDispatchToProps = MapDispatchToPropsObject<
  StoreAction | ThunkActionWithPromise | Promise<StoreAction>,
  ComponentAProps,
  Dispatchers
> = {
  onClick: anActionCreator
}
```
