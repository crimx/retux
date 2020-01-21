import { CreateActionCatalog, ActionHandlers } from 'retux'

export const initState = {
  isPinging: false
}

export type State = Readonly<typeof initState>

export type ActionCatalog = CreateActionCatalog<{
  PINGPONG$PING: {
    /** delay, default 1000ms */
    payload?: number
  }
  PINGPONG$PONG: {}
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  PINGPONG$PING: () => ({ isPinging: true }),
  PINGPONG$PONG: () => ({ isPinging: false })
}
