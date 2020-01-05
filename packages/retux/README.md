# [Retux](https://github.com/crimx/retux/tree/master/packages/retux)

[![npm-version](https://img.shields.io/npm/v/retux.svg)](https://www.npmjs.com/package/retux)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/retux)](https://bundlephobia.com/result?p=retux)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Core library of Retux, a minimalist type-safe(strongly-typed) scalable declarative Redux architecture.

## Installation

- yarn: `yarn add retux`
- npm: `npm add retux`

## A Simple Example

This is the basic structure of Retux architecture(Others see [examples](https://github.com/crimx/retux/tree/master/examples)).

As you can see it's declarative but no boilerplate codes. New comers can easily figure out available actions of a module with the `ActionCatalog`. Everything is strongly typed and  highly flexible. A Retux module can easily be split into sub-modules with the same structure.

```typescript
import { createStore } from 'redux'
import {
  CreateActionCatalog,
  ActionHandlers,
  createReducer
} from 'retux'

type CounterActionCatalog = CreateActionCatalog<{
  INCREMENT: {
    payload: {
      /** default 1 */
      step?: number
    }
  }
  DECREMENT: {
    payload: {
      /** default 1 */
      step?: number
    }
  }
}>

const initState = {
  count: 0
}

type CounterState = typeof initState

const counterActionHandlers: ActionHandlers<
  CounterState,
  CounterActionCatalog
> = { // Any missing or mistyped action name is caught by ts compiler.
  INCREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count + step
  }),
  DECREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count - step
  })
}

const reducer = createReducer(initState, counterActionHandlers)

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

// Actions are strongly typed. Any mistyped name is caught by ts compiler.
store.dispatch({ type: 'INCREMENT' })

// Payload and meta are also strongly typed.
store.dispatch({ type: 'DECREMENT', payload: { step: 10 } })
```

## Highlights

