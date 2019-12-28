import { CreateActionCatalog, ActionHandlers } from 'retux'

export const state = 'SHOW_ALL' as 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export type State = typeof state

export type ActionCatalog = CreateActionCatalog<{
  'VISIBILITY_FILTER/SET': {
    payload: State
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  'VISIBILITY_FILTER/SET': (state, { payload }) => payload
}
