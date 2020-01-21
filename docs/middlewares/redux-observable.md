# Retux Observable

This is a guide on how to strongly type [Redux Observable](https://redux-observable.js.org/) in Retux architecture.

Also see the [example project](https://github.com/crimx/retux/blob/master/examples/redux-observable-example).

## Prerequisites

- [Core Concenpts](../guide/core-concepts.md)
- [Directory Structure](../guide/directory-structure.md)

## Directory Structure

Following the standard [Retux directory structure](../guide/directory-structure.md), we place epics in a dedicated directory as it runs side by side with the Redux store.

```
├── src
│   ├── retux-store
│   │   ├── epics
│   │   │   ├── todos.ts
│   │   │   ├── utils.ts
│   │   │   └── index.ts
│   │   ├── modules
│   │   │   ├── todos.ts
│   │   │   ├── visibilityFilter.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
```

## Customize Epic and ofType

Customize the `Epic` type and `ofType` for easy use in Retux.

```typescript
// src/retux-store/epics/utils.ts
import { Observable } from 'rxjs'
import { Epic as RawEpic, ofType as rawOfType } from 'redux-observable'
import { StoreAction, StoreActionType, StoreState } from '../modules'

/** Tailored `Epic` for the store. */
export type Epic<
  TOutType extends StoreActionType = StoreActionType,
  TDeps = any
> = RawEpic<StoreAction, StoreAction<TOutType>, StoreState, TDeps>

/**
 * Tailored `ofType` for the store.
 * Now you can use `ofType` directly without the need to
 * manually offer types each time.
 */
export const ofType = rawOfType as <
  TInAction extends StoreAction,
  TTypes extends StoreActionType[] = StoreActionType[],
  TOutAction extends StoreAction = StoreAction<TTypes[number]>
>(
  ...types: TTypes
) => (source: Observable<TInAction>) => Observable<TOutAction>
```

Now you can write type-safe Epics with ease.

```typescript
import { mapTo, switchMap } from 'rxjs/operators'
import { timer } from 'rxjs'

// Helpers that are tailored for the store
import { Epic, ofType } from './utils'

export const pingEpic: Epic<'PINGPONG$PONG'> = action$ =>
  action$.pipe(
    ofType('PINGPONG$PING'),
    // correctly infer 'PINGPONG$PING' action
    switchMap(({ payload: delay = 1000 }) => timer(delay)),
    mapTo({ type: 'PINGPONG$PONG' })
  )
```

## Expose Root Epic

Combine Epics.

```typescript
// src/retux-store/epics/index.ts
import { combineEpics } from 'redux-observable'
import { pingEpic } from './ping'

export const rootEpic = combineEpics(pingEpic)
```

## Setup Middleware

```typescript
// src/retux-store/index.ts
import { applyMiddleware, createStore as createReduxStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { StoreAction, StoreState, rootReducer } from './modules'
import { rootEpic } from './epics'

/** Redux store setup */
export const createStore = () => {
  const epicMiddleware = createEpicMiddleware<
    StoreAction,
    StoreAction,
    StoreState
  >()

  const store = createReduxStore(rootReducer, applyMiddleware(epicMiddleware))

  epicMiddleware.run(rootEpic)

  return store
}
```
