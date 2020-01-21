import { proxyCombineUniqueObjects } from 'retux'
import {
  ActionCatalog as CRUDActionCatalog,
  actionHandlers as crudActionHandlers
} from './handlers/crud'
import {
  ActionCatalog as BulkActionCatalog,
  actionHandlers as bulkActionHandlers
} from './handlers/bulk'

// if '--isolatedModules' flag is provided
import * as _State from './state'
export type State = _State.State
export { initialState } from './state'
// Otherwise
// export { state, State } from './state'

// This shows the ability to split action handlers

export type ActionCatalog = CRUDActionCatalog & BulkActionCatalog

export const actionHandlers = proxyCombineUniqueObjects(
  crudActionHandlers,
  bulkActionHandlers
)
