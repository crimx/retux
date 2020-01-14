# Introduction

Retux is a TypeScript Redux architecture which aims for reducing boilerplate code while maintaining better type-inferring, readability and scalability.

The `retux` package contains mostly type helpers with some utility-functions for working with Redux.

## Installation

Retux is meant to work with Redux so you have to install both:

```bash
# NPM
npm install --save redux retux

# Yarn
yarn add redux retux
```

::: warning
Retux does not offer precompiled UMD package since it is mainly for TypeScript projects.
:::

## Basic Example

The best part of Retux is that you can always start with the basic form of Retux then easily perform small refactoring along the way as the project scales.

Here is a typical Retux module with 4 exports:

```typescript
import { CreateActionCatalog, ActionHandlers } from 'retux'

// All actions of a module are defined here.
// This is the core of Retux design.
// Other infomation will be extracted from Action Catalog.
// It can also be easily splited as it scales.
export type ActionCatalog = CreateActionCatalog<{
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

export const initState = {
  count: 0
}

export type State = Readonly<typeof initState>

// Action Handlers can be easily splited as it scales.
export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  // Any missing or mistyped action will be caught by ts compiler.
  INCREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count + step
  }),
  DECREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count - step
  })
}

// Then at the store root:

import { createStore } from 'redux'
import { createReducer, createActionCreators } from 'retux'

const reducer = createReducer(initState, counterActionHandlers)

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

// Actions are strongly typed. Any mistyped name is caught by ts compiler.
store.dispatch({ type: 'INCREMENT' })

// Or if you prefer action creators
const action = createActionCreators(actionHandlers)
// Payload and meta are also strongly typed with the action type.
store.dispatch(action.DECREMENT({ step: 10 }))
```

See [examples](https://github.com/crimx/retux/tree/master/examples) for more realistic code.

Retux introduces the concept of `ActionCatalog` which has all the readability benefits from [Flux constant style](https://redux.js.org/recipes/reducing-boilerplate#actions) without adding any boilerplate code. More details on the power of `ActionCatalog` see [Core Concepts](./core-concepts.md) of Retux.
