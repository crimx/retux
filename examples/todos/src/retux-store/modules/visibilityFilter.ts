import { CreateActionCatalog, ActionHandlers } from 'retux'

export const initState = 'SHOW_ALL' as
  | 'SHOW_ALL'
  | 'SHOW_COMPLETED'
  | 'SHOW_ACTIVE'

export type State = Readonly<typeof initState>

export type ActionCatalog = CreateActionCatalog<{
  VISIBILITY_FILTER$SET: {
    payload: State
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  VISIBILITY_FILTER$SET: (state, { payload }) => payload
}
