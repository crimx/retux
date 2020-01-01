import { combineUniqueObjects } from 'retux'
import {
  ActionCatalog as CRUDActionCatalog,
  actionHandlers as crudActionHandlers
} from './handlers/crud'
import {
  ActionCatalog as BulkActionCatalog,
  actionHandlers as bulkActionHandlers
} from './handlers/bulk'
import { state } from './state'

export { state } from './state'

export type State = typeof state

// This shows the ability to split action handlers

export type ActionCatalog = CRUDActionCatalog & BulkActionCatalog

export const actionHandlers = combineUniqueObjects(
  crudActionHandlers,
  bulkActionHandlers
)
