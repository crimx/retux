import { CreateActionCatalog, ActionHandlers } from 'retux'
import { VisibilityFilter } from '../../utilities/visibility'

export const state = 'SHOW_ALL' as VisibilityFilter

export type State = typeof state

export type ActionCatalog = CreateActionCatalog<{
  VisibilityFilterSet: {
    payload: State
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  VisibilityFilterSet: (state, { payload }) => payload
}
