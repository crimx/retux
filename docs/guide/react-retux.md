# React Retux

Note that you can write Containers with `react-redux` as usual. But if you want extra type strictness, missing-props checking and better auto-completion, give [React Retux][react-retux] a try.

[React Retux][react-retux] is a type enhancement suite which contains no JavaScript code. It does not rely on Retux architecture and can be used on its own.

## Extract Dispatchers

First pick props properties that will dispatch Redux Actions.

```typescript
// src/containers/FilterLink.tsx
import { ExtractDispatchers } from 'react-retux'
import { Link, LinkProps } from '../components/Link'

type Dispatchers = ExtractDispatchers<LinkProps, 'setFilter'>
```

## Map State To Props

```typescript
// src/containers/FilterLink.tsx
import { ExtractDispatchers, MapStateToProps } from 'react-retux'
import { PropsWithChildren } from 'react'
import { StoreState, StoreAction } from '../retux-store'
import { Link, LinkProps } from '../components/Link'

type Dispatchers = ExtractDispatchers<LinkProps, 'setFilter'>

// Own Props
export interface FilterLinkProps {
  filter: VisibilityFilter
}

const mapStateToProps: MapStateToProps<
  StoreState,
  LinkProps,
  Dispatchers,
  PropsWithChildren<FilterLinkProps>
> = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
```

## Map Dispatch To Props

There are two types of `MapStateToProps` in React Redux.

### Function Form

```typescript
import { connect } from 'react-redux'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'
import { action } from '../retux-store/actions'
import { Link, LinkProps } from '../components/Link'
import { StoreState, StoreAction } from '../retux-store'
import { VisibilityFilter } from '../utilities/visibility'
import { PropsWithChildren } from 'react'

type Dispatchers = ExtractDispatchers<LinkProps, 'setFilter'>

export interface FilterLinkProps {
  filter: VisibilityFilter
}

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
  setFilter: () => {
    dispatch(action.VisibilityFilterSet(ownProps.filter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)
```

### Object Form

```typescript
import { connect } from 'react-redux'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'
import { StoreState, StoreAction } from '../retux-store'
import { action } from '../retux-store/actions'
import { MainSection, MainSectionProps } from '../components/MainSection'

type Dispatchers = ExtractDispatchers<
  MainSectionProps,
  'completeAllTodos' | 'clearCompleted'
>

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  MainSectionProps,
  Dispatchers
> = {
  completeAllTodos: action.TODOS$COMPLETE_ALL,
  clearCompleted: action.TODOS$CLEAR_COMPLETED
}
```

## Mixed Action Types

If you use middlewares like Redux Thunk or Redux Promise which introduce mixed Action types, you need to use the more primitive `MapDispatchToPropsFunction` or `MapDispatchToPropsObject`.

See [Redux Thunk and Redux Promise](../middlewares/redux-thunk-and-redux-promise.md) for more details.

[react-retux]: https://github.com/crimx/retux/tree/master/packages/react-retux
