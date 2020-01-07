import { DefaultAction, DefaultActionHandlers, hasOwnProperty } from './utils'
import { GetActionCatalogFromHandlers, Action } from './basic/types'
import {
  GetActionCatalogFromHandlers as GetActionCatalogFromFSAHandlers,
  Action as FSA
} from './fsa/types'

/**
 * @template S State
 * @template A Action
 */
export function createReducer<
  S,
  A extends DefaultAction | undefined = undefined,
  AH extends {} = DefaultActionHandlers<S>
>(
  initialState: S,
  handlers: AH
): (
  state: S | undefined,
  action: A extends undefined
    ? GetActionCatalogFromHandlers<AH> extends never
      ? GetActionCatalogFromFSAHandlers<AH> extends never
        ? DefaultAction & { [T: string]: any }
        : FSA<GetActionCatalogFromFSAHandlers<AH>> // fsa actions
      : Action<GetActionCatalogFromHandlers<AH>> // basic actions
    : A
) => S {
  return function reducer(state = initialState, action) {
    if (hasOwnProperty.call(handlers, action.type)) {
      return (handlers as DefaultActionHandlers<S>)[action.type](state, action)
    } else {
      return state
    }
  }
}
