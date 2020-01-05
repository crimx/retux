# Retux Todo List Example

This example is based on the Redux [Todo List](https://github.com/reduxjs/redux/blob/master/examples) example.

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

## Explanation

It is recommended to read the core concept of Retux first for better understanding.

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

For each module, export these properties:

- `ActionCatalog`: Core of Retux.
- `actionHandlers` of the module.
- `state`: Module state.
  - A way to avoid maintaining a side-by-side state type is to leverage type inferring. Use `as` to give properties proper typings. e.g.
    ```typescript
    export const state = {
      status: 'success' as 'success' | 'loading' | 'error'
    }
  
    export type State = typeof state
    ```

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

Take `FilterLink.tsx` for example:

```typescript
import { connect } from 'react-redux'
import { Link, LinkProps } from '../components/Link'
import { StoreState, StoreAction } from '../retux-store'
import { PropsWithChildren } from 'react'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'

export interface FilterLinkProps {
  filter: StoreState['visibilityFilter']
}

type Dispatchers = ExtractDispatchers<LinkProps, 'onClick'>

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

Common questions:

> Why define `Dispatchers` in the container? Why not let the `Link` component export both Dispatchers and other Props types?

Normal components should not be aware of the Redux store. It is the container's job to decide which props property is dispatchable.

With `Dispatchers` the result of `mapStateToProps` and `mapDispatchToProps` can be further restricted. We have not only a safer type-checking but also a more pleasant coding experience with intellisense.

> I don't see any action creator?

Yes! This example shows the ability to reduce boilerplate action creators on small projects with Retux.

TypeScript compiler and intellisense are your best buddies.

![action-intellisense](./assets/action-intellisense.gif)

If you are more comfortable with action creators, Retux also offers a powerful way to generate boilerplate action creators for you. See docs and the todomvc example.

> Why if I mistype the action type?

All actions in Retux are strongly typed. TypeScript compiler will happily let you know.

![action-mistyped](./assets/action-mistyped.png)

> What about changes in the future?

You can either glue the changes in container(where the action is triggered) or in action handler(where the action is handled).

But if you decide to use libraries which mutate action types(like Redux-Thunk and Redux-Promise), it's better to go for action creators.

> Should I get rid of action creators entirly?

No! You can always use action creators when abstraction is needed. See other Retux examples.
