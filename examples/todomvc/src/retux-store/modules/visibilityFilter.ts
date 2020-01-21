import { CreateActionCatalog, ActionHandlers } from 'retux'
import { VisibilityFilter } from '../../utilities/visibility'

export const initialState = 'SHOW_ALL' as VisibilityFilter

export type State = Readonly<typeof initialState>

export type ActionCatalog = CreateActionCatalog<{
  VISIBILITY_FILTER$SET: {
    payload: State
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  VISIBILITY_FILTER$SET: (state, { payload }) => payload
}
