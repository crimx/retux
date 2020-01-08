import { DefaultAction, DefaultActionHandlers, hasOwnProperty } from './utils'
import { GetActionCatalogFromHandlers, Action } from './basic/types'
import {
  GetActionCatalogFromHandlers as GetActionCatalogFromFSAHandlers,
  Action as FSA
} from './fsa/types'

/**
 * @param initialState Initial state
 * @param handlers Retux Action Handler
 */
export function createReducer<
  TState,
  TAction extends DefaultAction | undefined = undefined,
  THandlers extends {} = DefaultActionHandlers<TState>
>(
  initialState: TState,
  handlers: THandlers
): (
  state: TState | undefined,
  action: TAction extends undefined
    ? GetActionCatalogFromHandlers<THandlers> extends never
      ? GetActionCatalogFromFSAHandlers<THandlers> extends never
        ? DefaultAction & { [T: string]: any }
        : FSA<GetActionCatalogFromFSAHandlers<THandlers>> // fsa actions
      : Action<GetActionCatalogFromHandlers<THandlers>> // basic actions
    : TAction
) => TState {
  return function reducer(state = initialState, action) {
    if (hasOwnProperty.call(handlers, action.type)) {
      return (handlers as DefaultActionHandlers<TState>)[action.type](
        state,
        action
      )
    } else {
      return state
    }
  }
}
