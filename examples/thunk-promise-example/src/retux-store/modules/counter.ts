import { CreateActionCatalog, ActionHandlers } from 'retux'

export type CounterActionCatalog = CreateActionCatalog<{
  INCREMENT: {
    /** Step */
    payload?: number
  }
  DECREMENT: {
    /** Step */
    payload?: number
  }
}>

export const counterState = {
  count: 0
}

export type CounterState = typeof counterState

export const counterActionHandlers: ActionHandlers<
  CounterState,
  CounterActionCatalog
> = {
  INCREMENT: (state, { payload }) => ({
    ...state,
    count: state.count + (payload == null ? 1 : payload)
  }),
  DECREMENT: (state, { payload }) => ({
    ...state,
    count: state.count - (payload == null ? 1 : payload)
  })
}
