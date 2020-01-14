import { CreateActionCatalog, ActionHandlers } from 'retux'

export const initState = [] as Array<{
  id: string
  text: string
  completed: boolean
}>

export type State = Readonly<typeof initState>

export type ActionCatalog = CreateActionCatalog<{
  TODOS$ADD: {
    /** text */
    payload: string
  }
  TODOS$TOGGLE: {
    /** id */
    payload: string
  }
}>

export const actionHandlers: ActionHandlers<State, ActionCatalog> = {
  TODOS$ADD: (state, { payload: text }) => [
    ...state,
    {
      id:
        Date.now()
          .toString()
          .slice(6) +
        Math.random()
          .toString()
          .slice(2, 8),
      text,
      completed: false
    }
  ],
  TODOS$TOGGLE: (state, { payload: id }) =>
    state.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
}
