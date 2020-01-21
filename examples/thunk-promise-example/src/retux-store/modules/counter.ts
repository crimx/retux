import { CreateActionCatalog, ActionHandlers } from 'retux'

export type CounterActionCatalog = CreateActionCatalog<{
  COUNTER$INCREMENT: {
    /** Step */
    payload?: number
  }
  COUNTER$DECREMENT: {
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
  COUNTER$INCREMENT: (state, { payload }) => ({
    ...state,
    count: state.count + (payload == null ? 1 : payload)
  }),
  COUNTER$DECREMENT: (state, { payload }) => ({
    ...state,
    count: state.count - (payload == null ? 1 : payload)
  })
}
