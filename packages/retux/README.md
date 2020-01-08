# [Retux](https://github.com/crimx/retux/tree/master/packages/retux)

[![npm-version](https://img.shields.io/npm/v/retux.svg)](https://www.npmjs.com/package/retux)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/retux)](https://bundlephobia.com/result?p=retux)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Core library of Retux, a minimalist declarative type-safe(strongly-typed) scalable Redux architecture.

## Features

- Minimalist. Retux reduces huge volume of boilerplate code while still gaining better type-infer and auto-completion.
- Declarative. Action-First desgin instead of Action-Creator-Fisrt makes it clean, less-hacking and easy to read for new contributors(including future-self!).
- Type-safe(strongly-typed). Retux enforces strict typings. With utilities of Retux you will never lose the strictness of typings while enjoying great flexibility.
- Scalable. A Retux module can be easily split into isomorphic sub-modules. Retux can also optionly leverage the power of meta-programming on modern engine for further performance boost.

## Installation

- yarn: `yarn add retux`
- npm: `npm add retux`

## At First Glance

This is the basic structure of Retux architecture(Others see [examples](https://github.com/crimx/retux/tree/master/examples)).

```typescript
import { createStore } from 'redux'
import { CreateActionCatalog, ActionHandlers, createReducer } from 'retux'

// All actions of a module are defined here.
// This is the core of Retux design.
// Other infomation will be extracted from Action Catalog.
export type ActionCatalog = CreateActionCatalog<{
  INCREMENT: {
    payload: {
      // Comments will also be displayed on the intellisense panel
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

export type State = typeof initState

// Action Handlers can be easily splited.
export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  // Any missing or mistyped action will be caught by ts compiler.
  INCREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count + step
  }),
  DECREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count - step
  })
}

// Now in the store root:

const reducer = createReducer(initState, counterActionHandlers)

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

// Actions are strongly typed. Any mistyped name is caught by ts compiler.
store.dispatch({ type: 'INCREMENT' })

// Payload and meta are also strongly typed with the action type.
store.dispatch({ type: 'DECREMENT', payload: { step: 10 } })
```

## Actions

If we need all the actions:

```typescript
import { Action } from 'retux'

export type ActionCatalog = CreateActionCatalog<{
  ACTION1: { payload: boolean }
  ACTION2: { payload: number, meta?: boolean }
  ACTION3: { payload: { val: string } }
}>

type ModuleActions = Action<ActionCatalog>

// single action
type ActionIncrement = Action<ActionCatalog, 'ACTION1'>
```

Notice `ModuleActions` will be 

```typescript
type ModuleActions =
  | { type: 'ACTION1', payload: boolean }
  | { type: 'ACTION2', payload: number, meta?: boolean }
  | { type: 'ACTION3', payload: { val: string } }
```

instead of

```typescript
type ModuleActions = {
  type: 'ACTION1' | 'ACTION2' | 'ACTION3',
  payload: boolean | number | { val: string }
  meta?: boolean | undefined
}
```

## Action Creators

Retux is Action-First. All Action Creators are generated from Actions.

```typescript
import { createActionCreators } from 'retux'

const action = createActionCreators<ActionCatalog>(actionHandlers)

dispatch(action.ACTION1(true))
```

That's it! Later on if you want to replace an action with thunk etc.

```typescript
const action = createActionCreators<ActionCatalog>(
  actionHandlers,
  {
    ACTION1: (payload: boolean): MyThunkAction<'ACTION1'> =>
      dispatch => dispatch({ type: 'ACTION1', payload })
  }
)
```

Retux also offers `proxyActionCreators` for modern engines which does the same thing except action creators are lazy created on first visit.

See the docs for all the features of Retux.



