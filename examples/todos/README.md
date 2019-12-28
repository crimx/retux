# `example-basic-todo`

This example is based on the Redux [Todo List](https://redux.js.org/basics/example) example.

## Explanation

Read the [core concept of Retux](https://github.com/crimx/retux/blob/master/packages/retux/README.md#core-concept-of-retux) before proceed.

### Directory Structure

Directory structure is not mandatory in Retux. This is just for reference.

Here is one of the basic patterns of Retux archarchitecture.

```
.
├── src
│   ├── compnents
│   │   ├── App.tsx
│   │   └── (other components)
│   │
│   ├── contianers
│   │   ├── AddTodo.tsx
│   │   └── (other contianers)
│   │
│   └── retux-store
│       ├── modules
│       │   ├── module1.ts
│       │   └── (other modules)
│       └── index.ts

```

### Retux Store

All Retux modules live in `retux-store/modules`. In the Todo List example there are two independent modules:

1. `todos` for managing todo items.
2. `visibilityFilter` for managing todo list display.

Since they are independent, in the Redux example they are placed in separate reducers. In Retux we can do the same. There are other patterns for modularization in Retux but let's stick with the original example for now.

Inside each module, export these properties:

- `ActionCatalog`: Core of Retux.
- `actionHandlers` of the module.
- `state`: Module state.
  - A way to avoid maintaining a side-by-side state type is to leverage type inferring Use `as` to give properties proper typings. e.g.
    ```typescript
    export const state = {
      status: 'success' as 'success' | 'loading' | 'error'
    }
  
    export type State = typeof state
    ```

As you can see they are all necessary ingredients. No boilerplate ceremony is going on.

In `retux-store/index.ts` we expose these properties:

- `createStore` for root component.
   - This is where you prepare the Redux store(e.g. setup Redux middlewares).
- `StoreAction` and `StoreState` for containers.
   - With Retux we can easily combine all the actions and states together.

### Components

Components should not be aware of the Redux store.

It is tempting to reuse typings shared by components and Redux store. Write them separately. Keep the components pure and independent. If there are mismatches in the future, it is the containers' job to fill the gaps.

But if you have to, put the shared typings in a dedicated directory.

### Containers

Containers are glue components between Retux store and normal components.

Retux offers `MapStateToProps` and `MapDispatchToProps` types for usage with `react-redux`.

Take `FilterLink.tsx` as example:

```typescript
import { connect } from 'react-redux'
import { Link, LinkProps } from '../components/Link'
import { StoreState, StoreAction } from '../retux-store'
import { PropsWithChildren } from 'react'
import { MapStateToProps, MapDispatchToProps } from 'retux'

export interface FilterLinkProps {
  filter: StoreState['visibilityFilter']
}

type Dispatchers = 'onClick'

const mapStateToProps: MapStateToProps<
  StoreState,
  LinkProps,
  Dispatchers,
  PropsWithChildren<FilterLinkProps>
> = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  LinkProps,
  Dispatchers,
  PropsWithChildren<FilterLinkProps>
> = (dispatch, ownProps) => ({
  onClick: () =>
    dispatch({ type: 'VISIBILITY_FILTER/SET', payload: ownProps.filter })
})

export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link)
```

Here are some common questions:

> Why define `Dispatchers` in the container? Why not let the `Link` component export both Dispatchers and other Props types?

Because as we metioned normal components are not aware of the Redux store. It is the container's job to decide which props property is dispatchable.

> I don't see any action creator?

Yes! With TypeScript you can get rid of the boilerplate action creators(who do nothing but simply return an action).

Enjoy the TypeScript intellisense. :)

![action-intellisense](./assets/action-intellisense.gif)

> Why if mistyped the action type?

All actions in Retux are strongly typed. TypeScript compiler will happily let you know.

![action-mistyped](./assets/action-mistyped.png)


> What about changes in the future?

You can either glue the changes in container(where the action is triggered) or in action handler(where the action is handled).

> Should I get rid of action creators entirly?

No! Of cource you should use action creators **WHEN** abstraction is needed.
