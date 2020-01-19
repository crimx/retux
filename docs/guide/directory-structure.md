---
sidebarDepth: 2
---

# Directory Structure

With Retux it is recommended always start with the basic structure and perform small refactoring as it scales.

## Basic Structure

```
├── src
│   ├── retux-store
│   │   ├── modules
│   │   │   ├── todos.ts
│   │   │   └── visibilityFilter.ts
│   │   └── index.ts
│   │
│   ├── containers
|   |   └── List.tsx
│   │
│   ├── components
│   │   └── App.tsx
│   │
│   └── index.tsx
│
└── package.json
```

### Retux Modules

Let's start with the Retux modules directory. Each basic module has at least four exports: `ActionCatalog`, `initState`, `State`, `actionHandlers`.

```typescript
import { CreateActionCatalog, ActionHandlers } from 'retux'

export type ActionCatalog = CreateActionCatalog<{
  COUNTER$INCREMENT: {
    payload: {
      /** default 1 */
      step?: number
    }
  }
  COUNTER$DECREMENT: {
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

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  COUNTER$INCREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count + step
  }),
  COUNTER$DECREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count - step
  })
}
```

When a module gets too large, you can always split it into seperated files.

```
├── src
│   ├── retux-store
│   │   ├── modules
│   │   │   ├── todos
│   │   │   │   ├── state.ts
│   │   │   │   ├── action-catalog.ts
│   │   │   │   ├── action-handlers.ts
│   │   │   │   ├── index.ts
```

```typescript
// state.ts
export const initState = {
  count: 0
}

export type State = Readonly<typeof initState>
```

```typescript
// action-catalog.ts
import { CreateActionCatalog } from 'retux'

export type ActionCatalog = CreateActionCatalog<{
  COUNTER$INCREMENT: {
    payload: {
      /** default 1 */
      step?: number
    }
  }
  COUNTER$DECREMENT: {
    payload: {
      /** default 1 */
      step?: number
    }
  }
}>
```

```typescript
// action-handlers.ts
import { ActionHandlers } from 'retux'
import { State } from './state'
import { ActionCatalog } from './action-catalog'

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  COUNTER$INCREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count + step
  }),
  COUNTER$DECREMENT: (state, { payload: { step = 1 } }) => ({
    count: state.count - step
  })
}
```

```typescript
// index.ts
export { initState, State } from './state'
export { ActionCatalog } from './action-catalog'
export { actionHandlers } from './action-handlers'
```

### Retux Entry

In `retux-store/index.ts` we combine modules.

```typescript
import { combineReducers, createStore as createReduxStore } from 'redux'
import { createReducer, proxyCombineUniqueObjects, Action } from 'retux'
import * as Todos from './modules/todos'
import * as VisibilityFilter from './modules/visibilityFilter'

export type StoreActionCatalog = Todos.ActionCatalog &
  VisibilityFilter.ActionCatalog
  
export type StoreActionType = ActionType<StoreActionCatalog>

export type StoreAction<T extends StoreActionType = StoreActionType> = Action<
  StoreActionCatalog,
  T
>

export const storeActionHandlers = proxyCombineUniqueObjects(
  Todos.actionHandlers,
  VisibilityFilter.actionHandlers
)

export type StoreState = Readonly<{
  todos: Todos.State
  visibilityFilter: VisibilityFilter.State
}>

/** Redux store setup */
export const createStore = () =>
  createReduxStore(
    combineReducers({
      todos: createReducer(Todos.initState, Todos.actionHandlers),
      visibilityFilter: createReducer(
        VisibilityFilter.initState,
        VisibilityFilter.actionHandlers
      )
    })
  )
```

Here shows usage with Redux's `combineReducers`. Each module has a separated state. Modules can also share a single state.

If you have a complex store setup, move `createStore` to `retux-store/create-store.ts`.


## With Action Creators

If you prefer Action Creators, add:

```{3,4}
├── src
│   ├── retux-store
│   │   ├── actions.ts
│   │   ├── modules
│   │   │   ├── todos.ts
│   │   │   └── visibilityFilter.ts
│   │   └── index.ts
│   │
│   ├── containers
|   |   └── List.tsx
│   │
│   ├── components
│   │   └── App.tsx
│   │
│   └── index.tsx
│
└── package.json
```

In `retux-store/actions.ts` we generate and customize Action Creators.

```typescript
import { proxyActionCreators } from 'retux'
import { storeActionHandlers, StoreAction } from './index'

export const action = proxyActionCreators(
  storeActionHandlers,
  {
    OVERWRITE_ACTION: (id: string, text: string): StoreAction<'TODOS$EDIT'> => ({
      type: 'TODOS$EDIT',
      payload: { id, text }
    })
  }
)
```

See [example](https://github.com/crimx/retux/blob/master/examples/thunk-promise-example/src/retux-store/actions.ts) for more Action Creator patterns.

As it scales, you can split action creators into different files.

```
├── src
│   ├── retux-store
│   │   ├── actions
│   │   │   ├── todos.ts
│   │   │   ├── visibilityFilter.ts
│   │   │   └── index.ts
```

## State Sharing

You can have a single state for the entire store.

```
├── src
│   ├── retux-store
│   │   ├── state
│   │   │   └── index.ts
│   │   ├── modules
│   │   │   ├── todos.ts
│   │   │   └── visibilityFilter.ts
```

Or just sharing state among a few modules.

```
├── src
│   ├── retux-store
│   │   ├── modules
│   │   │   ├── todos
│   │   │   │   ├── state.ts
│   │   │   │   ├── basic.ts
│   │   │   │   ├── bulk.ts
│   │   │   │   └── index.ts
│   │   │   └── visibilityFilter.ts
```

See [example](https://github.com/crimx/retux/blob/master/examples/todomvc/src/retux-store/modules/todos).`todos/basic.ts` and `todos/bulk.ts` export `ActionCatalog` and `actionHandlers` which are combined at `todos/index.ts`.
