import { createReducer } from '../src/create-reducer'
import { createStore } from 'redux'
import { FSAHandlers, ActionHandlers, CreateActionCatalog } from '../src/'

describe('create-reducer', () => {
  it('should create Redux compatible reducer from any action handlers', () => {
    const actionHandlers = {
      ACTION1: (state: number) => state + 1,
      ACTION2: (state: number, action: { payload: number }) =>
        state + action.payload
    }

    const store = createStore(createReducer(0, actionHandlers))

    store.dispatch({ type: 'ACTION1' })
    expect(store.getState()).toBe(1)

    store.dispatch({ type: 'ACTION2', payload: 2 })
    expect(store.getState()).toBe(3)
  })

  it('should create Redux compatible reducer from basic action handlers', () => {
    type ActionCatalog = CreateActionCatalog<{
      ACTION1: {}
      ACTION2: { payload: number }
    }>

    const actionHandlers: ActionHandlers<number, ActionCatalog> = {
      ACTION1: state => state + 1,
      ACTION2: (state, action) => state + action.payload
    }

    const store = createStore(createReducer(0, actionHandlers))

    store.dispatch({ type: 'ACTION1' })
    expect(store.getState()).toBe(1)

    store.dispatch({ type: 'ACTION2', payload: 2 })
    expect(store.getState()).toBe(3)
  })

  it('should create Redux compatible reducer from flux action handlers', () => {
    type ActionCatalog = CreateActionCatalog<{
      ACTION1: {}
      ACTION2: { payload: number }
    }>

    const actionHandlers: FSAHandlers<number, ActionCatalog> = {
      ACTION1: state => state + 1,
      ACTION2: (state, action) => state + (action.error ? 1 : action.payload)
    }

    const store = createStore(createReducer(0, actionHandlers))

    store.dispatch({ type: 'ACTION1' })
    expect(store.getState()).toBe(1)

    store.dispatch({ type: 'ACTION2', payload: 2 })
    expect(store.getState()).toBe(3)
  })
})
