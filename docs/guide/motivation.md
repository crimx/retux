# Motivation

The main motivation of creating Retux is that we need a TypeScript Redux architecture that reduces boilerplate code while still being declarative. The current norm which surrounds Action Creators is mostly borrowed from the JavaScript realm. We know TypeScript can do more. That is why we redesigned from the ground up with type-first in mind.

## Problems of the Official Recipes

Redux officially supports TypeScript typings. Yay! But wait, after reading the [recipes](https://redux.js.org/recipes/usage-with-typescript#usage-with-typescript) on the docs it seems even more cumbersome than JavaScript.

You ended up writing something like this:

```typescript
// src/store/system/types.ts
export const UPDATE_SESSION = 'UPDATE_SESSION'

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: SystemState
}

export type SystemActionTypes = UpdateSessionAction
```

```typescript
// src/store/system/actions.ts

import { SystemState, UPDATE_SESSION, SystemActionTypes } from './types'

export function updateSession(newSession: SystemState): SystemActionTypes {
  return {
    type: UPDATE_SESSION,
    payload: newSession
  }
}
```

We still write the boilerplate code like in JavaScript and now plus type definitions.

In Retux Actions of a module are defined only once in a central hub called [Action Catalog][ActionCatalog] which will be reused to generate other utilities including Action Creators.

## Problems of Other Typescript Guide

One of the most popular thrid-party solutions for Redux in TypeScript is the [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide#redux---typing-patterns).

To some degree it solves the redundance issue, but in the cost of dark magic.

```typescript
switch (action.type) {
    case getType(todos.add):
      return [...state, action.payload];
    ...
```

This is a clever solution to reuse code but it also brings obscurity. `getType(todos.add)` works because the `todos.add` function properties are modified by [typesafe-actions](https://github.com/piotrwitek/typesafe-actions#action-helpers). This is fine if everyone in the team are on the same page. For folks who prefer the KISS rule(Keep It Simple Stupid), Retux reuses Actions instead of Action Creators so no need to introduce extra magic. Also see Dan's [post](https://overreacted.io/goodbye-clean-code/) on clean code.

Then in the example on [Action Creators](https://github.com/piotrwitek/react-redux-typescript-guide#action-creators-):

```typescript
export const increment = () => action(INCREMENT);
export const add = (amount: number) => action(ADD, amount);

export const emptyAction = createAction(INCREMENT)<void>();
export const payloadAction = createAction(ADD)<number>();
export const payloadMetaAction = createAction(ADD)<number, string>();

export const payloadCreatorAction = createAction(
  'TOGGLE_TODO',
  (todo: Todo) => todo.id
)<string>();
```

This solves the boilerplate issue but the code is not clear enough for others to read. This is due to the Action declaration is mixing with the Action Creator's implementation. As project scales it is not easy for team members to take a glance and know what actions is provided and how to use them.

How about a separated documentation? Nah. Documentations are destined to be left unmaintained.

See how [Action Catalog][ActionCatalog] offers the same benefits of [Flux constant style][FluxConstantStyle] and how to generate Action Creators with [`createActionCreators`][CreateActionCreators].

## Problems of State Sharing

As the store scales in Redux it is recommended to split it into different reducers and combine them with `combineReducers`.

And [then](https://redux.js.org/faq/reducers#how-do-i-share-state-between-two-reducers-do-i-have-to-use-combinereducers):

> Many users later want to try to share data between two reducers, but find that `combineReducers` does not allow them to do so. There are several approaches that can be used:

Now you either go down the reducer-hell with `reduce-reducers` or move logic to middlewares. If you move only the necessary logic to middlewares(a.k.a fat reducer) then your codebase will look scattered which is hard for others to follow; or if for consistency you move most of the logic to middlewares(fat middleware) then the reducer is all boilerplate code.

Another drawback of combining reducers is performance related. With N reducers it will be N times slower on handling each Action. This may not be trivial for projects with many reducers and frequent `dispatch`.

Sharing states in Retux is simple because modules are desgined to be flexible on splitting and merging with low cost. See [Action Handlers][ActionHandlers] and [Combine Action Handlers][CombineActionHandlers].

## Get Rid of Boilerplate Action Creators

Boilerplate action creators are those who do nothing but simply return an action.

```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

There are two main reasons why action creators exist in Redux:

1. Redux relies on `string` to distinguish action types. But to JavaScript compiler, `ACTION1` and `ACTIONI` are no different - they are all `string`. So if you mistype `ACTION1` as `ACTIONI`(and you will, according to Murphy's Law), no compile-time error is yelled. But when the action is wrapped in a function whose name should you mistyped, the compiler/linter can now correctly catch the error.
  
   [Flux constant style][FluxConstantStyle] is another solution for this by assigning Actions names to constants.

   With TypeScript this is not an issue because we can declare actual `ACTION1` and `ACTION2` types.

2. With middlerwares like Redux Thunk or Redux Promise, an Action Creator can be easily swapped later on to gain async ability.

   This is true if you use middlerwares that introduce mixed action types. For others like Redux Saga or Redux Observable which implement Process Manager pattern, raw Actions are actually preferred in TypeScript. They are simpler to write and faster to run.
   
   Retux also has solution to strictly type mixed action types. See the [Redux Thunk and Redux Promise](../middlewares/redux-thunk-and-redux-promise.md) guide.

Nevertheless, boilerplate Action Creators got to go. Redux offers [`createActionCreators`][CreateActionCreators] and [`proxyActionCreators`][CreateActionCreators] for easy generating Action Creators.

[ActionCatalog]: ./core-concepts.md#action-catalog
[ActionHandlers]: ./core-concepts.md#action-handlers
[CreateActionCreators]: ./core-concepts.md#create-action-creators
[CombineActionHandlers]: ./core-concepts.md#combine-action-handlers
[FluxConstantStyle]: https://redux.js.org/recipes/reducing-boilerplate#actions
[examples]: https://github.com/crimx/retux/tree/master/examples
