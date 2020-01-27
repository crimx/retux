# Retux API Reference

## CreateActionCatalog

```typescript
Ƭ CreateActionCatalog<TCatalog>: TCatalog
```

Basic Actions configuration.
Index as action type.

**Type parameters:**

- `TCatalog` ActionCatalog

**Examples:**

```typescript
type ActionCatalog = CreateActionCatalog<{
  ACTION_NAME: {},
  ACTION_NAME2: {
    payload?: number
  },
  ACTION_NAME3: {
    payload: {
      loading: boolean
    }
    meta: string
  },
  ACTION_NAME4: {
    payload: {
      loading: boolean
    }
    error: number // For FSA, default `Error`
  },
}>
```


## ActionType

```typescript
Ƭ ActionType<TCatalog>: Extract<keyof TCatalog, string>
```

Extract all action type names from a ActionCatalog

**Type parameters:**

- `TCatalog` ActionCatalog


## Basic Action

### Action

```typescript
Ƭ Action<TCatalog, TType>: [A union of Actions]
```

Get a union of Basic Action types. ({ type, payload?, meta? })

If `TType` is provided, get a single Action of type `TType`.

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type. If ignored a union of all action types will be used.

### ActionHandler

```typescript
Ƭ ActionHandler<TState, TCatalog, TType>: [Action Handler]
```

Get a single Basic Action handler type of a module.

**Type parameters:**

- `TState` Module state.
- `TCatalog` ActionCatalog.
- `TType` Action type.

### ActionHandlers

```typescript
Ƭ ActionHandlers<TState, TCatalog>: [An object of all Action Handlers]
```

Get an object type of all Basic Action handler of a module.

**Type parameters:**

- `TState` Module state.
- `TCatalog` ActionCatalog.

### ActionCreator

```typescript
Ƭ ActionCreator<TCatalog, TType>: [An Action Creator]
```

Default type of the generated Action Creator: (depending on each Action)

```typescript
(payload?, meta?) => Action
```

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type.

### createActionCreator

```typescript
createActionCreator<TCatalog, TType>(type: TType): ActionCreator<TCatalog, TType>
```

Generate single Basic Action Creator with signature: (depending on each Action)

```typescript
(payload?, meta?) => Action
```

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type.

### createActionCreators

```typescript
createActionCreators<THandlers, TCatalog>(actionHandlers: THandlers): {}
createActionCreators<THandlers, TCatalog, TExtra>(
  actionHandlers: THandlers, extraActionCreators: TExtra
): {}
```

Generate An Object of Basic Action Creators with signature:

```typescript
{
  [Action1]: ([payload of Action1], [meta of Action1]) => Action1,
  ...
}
```

**Type parameters:** (No need to provide manually)

- `THandlers` Action Handlers.
- `TCatalog` ActionCatalog.
- `TExtra` An object.

**Parameters:**

Name | Type | Description
------ | ------ | ------ 
`actionHandlers` | THandlers | Retux Action Handlers.
`extraActionCreators` | TExtra | Overwrite some of the generated Action Creators or add more.

**Examples:**

```typescript
const action = createActionCreators(actionHandlers)
dispatch(action.ACTION_NAME)
```

Rewire `ACTION1` to an alternative Action Creator.

```typescript
const action = createActionCreators(
  actionHandlers,
  {
    ACTION1: () => {}
  }
)
```

### proxyActionCreators

Proxy version of [`createActionCreators`](#createactioncreators).

See [Proxy](../guide/proxy.md).



## Flux Standard Action

### FSA

```typescript
Ƭ FSA<TCatalog, TType>: [A union of Actions]
```

Get a union of Flux Standard Action types. ({ type, payload?, error?, meta? })

If `TType` is provided, get a single Action of type `TType`.

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type. If ignored a union of all action types will be used.

### FSAError

```typescript
Ƭ ActionError<TCatalog, TType>: [Error Action Type]
```

Get error form of an Action type.

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type. If ignored a union of all action types will be used.

### FSAHandler

```typescript
Ƭ FSAHandler<TState, TCatalog, TType>: [Action Handler]
```

Get a single Flux Standard Action handler type of a module.

**Type parameters:**

- `TState` Module state.
- `TCatalog` ActionCatalog.
- `TType` Action type.

### FSAHandlers

```typescript
Ƭ FSAHandlers<TState, TCatalog>: [An object of all Action Handlers]
```

Get an object type of all Flux Standard Action handler of a module.

**Type parameters:**

- `TState` Module state.
- `TCatalog` ActionCatalog.

### FSACreator

```typescript
Ƭ FSACreator<TCatalog, TType>: [An Action Creator]
```

Default type of the generated Action Creator: (depending on each Action)

```typescript
(payload?, error?, meta?) => Action
```

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type.

### createFSACreator

```typescript
createFSACreator<TCatalog, TType>(type: TType): ActionCreator<TCatalog, TType>
```


Generate single Flux Standard Action Creator with signature: (depending on each Action)

```typescript
(payload?, error?, meta?) => Action
```

**Type parameters:**

- `TCatalog` ActionCatalog.
- `TType` Action type.

### createFSACreators

```typescript
createFSACreators<THandlers, TCatalog>(actionHandlers: THandlers): {}
createFSACreators<THandlers, TCatalog, TExtra>(
  actionHandlers: THandlers, extraActionCreators: TExtra
): {}
```

Generate An Object of Flux Standard Action Creators with signature:

```typescript
{
  [Action1]: (
    [payload of Action1],
    [error of Action1],
    [meta of Action1]
  ) => Action1,
  ...
}
```

**Type parameters:** (No need to provide manually)

- `THandlers` Action Handlers.
- `TCatalog` ActionCatalog.
- `TExtra` An object.

**Parameters:**

Name | Type | Description
------ | ------ | ------ 
`actionHandlers` | THandlers | Retux Action Handlers.
`extraActionCreators` | TExtra | Overwrite some of the generated Action Creators or add more.

**Examples:**

```typescript
const action = createFSACreators(actionHandlers)
dispatch(action.ACTION_NAME)
```

Rewire `ACTION1` to an alternative Action Creator.

```typescript
const action = createFSACreators(
  actionHandlers,
  {
    ACTION1: () => {}
  }
)
```

### proxyFSACreator

Proxy version of [`createFSACreators`](#createfsacreators).

See [Proxy](../guide/proxy.md).

## Combine Objects

### combineObjects

```typescript
combineObjects<TObjects>(...objs: TObjects): [Combined object]
```

Like Object.assign except:

- Always returns a new object.
- The combined `ActionHandlers` won't lose index signature.


**Type parameters:** (No need to provide manually)

- `TObjects` A list of objects.

**Parameters:**

Name | Type | Description
------ | ------ | ------ 
`...objs` | TObjects | A list of objects.

### proxyCombineObjects

Proxy version of [`combineObjects`](#combineobjects).

See [Proxy](../guide/proxy.md).

### combineUniqueObjects

```typescript
combineUniqueObjects<TObjects>(...objs: TObjects): [Combined object]
```

Same as [`combineObjects`](#combineobjects):

- Always returns a new object.
- The combined `ActionHandlers` won't lose index signature.

Except:

- Duplicated keys are not allowed.
  - The resulted type will be inferred as `never` if there are(or potential) duplicated keys.
  - Throw `TypeError` on non-production mode.


**Type parameters:** (No need to provide manually)

- `TObjects` A list of objects.

**Parameters:**

Name | Type | Description
------ | ------ | ------ 
`...objs` | TObjects | A list of objects.

### proxyCombineUniqueObjects

Proxy version of [`combineUniqueObjects`](#combineuniqueobjects).

See [Proxy](../guide/proxy.md).

## createReducer

```typescript
createReducer<TState, TAction, THandlers>(
  initialState: TState, handlers: THandlers
): [Redux Reducer]
```

**Type parameters:**

- `TState` State.
- `TAction` Actions.
- `THandlers` Action Handlers.

**Parameters:**

Name | Type | Description
------ | ------ | ------ 
`initialState` | TState | Initial state.
`handlers` | THandlers | Action Handlers.
