import {
  DefaultActionCatalog,
  DefaultAction,
  ActionType,
  DefaultActionHandler
} from './utils'

/**
 * @template S State
 * @template C ActionCatalog
 * @template A Action
 * @template H Action handlers
 */
export function createDefaultReducer<
  S extends {},
  C extends DefaultActionCatalog,
  A extends DefaultAction,
  H extends { [type in ActionType<C>]: DefaultActionHandler<S, A> }
>(initialState: S, handlers: H): (state: S | undefined, action: A) => S {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
