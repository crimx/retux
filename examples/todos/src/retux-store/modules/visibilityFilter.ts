import { CreateActionCatalog, ActionHandlers } from 'retux'

export const initialState = 'SHOW_ALL' as
  | 'SHOW_ALL'
  | 'SHOW_COMPLETED'
  | 'SHOW_ACTIVE'

export type State = Readonly<typeof initialState>

export type ActionCatalog = CreateActionCatalog<{
  VISIBILITY_FILTER$SET: {
    payload: State
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  VISIBILITY_FILTER$SET: (state, { payload }) => payload
}
