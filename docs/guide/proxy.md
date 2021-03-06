# Lazy Load With Proxy

If you have read the [core concepts][core-concepts] of Retux, you may notice the flexibility of Retux relies heavily on manipulations on simple objects. See `combineObjects`, `combineUniqueObjects` and `createActionCreators`. To boost init performance Retux offers Proxy version of these functions.

- [`combineObjects`](../api/retux.md#combineobjects) -> [`proxyCombineObjects`](../api/retux.md#proxycombineobjects)
- [`combineUniqueObjects`](../api/retux.md#combineuniqueobjects) -> [`proxyCombineUniqueObjects`](../api/retux.md#proxycombineuniqueobjects)
- [`createActionCreators`](../api/retux.md#createactioncreators) -> [`proxyActionCreators`](../api/retux.md#proxyactioncreators)

Features:

1. Same signature. Can be swapped directly.
2. Object properties are only created and cached on first visit.
3. `Object.keys`, `Object.prototype.hasOwnProperty` and other property descriptor related methods work as usual.
4. Fallback to the simple counterparts when Proxy is not supported.

[core-concepts]: ./core-concepts.md
