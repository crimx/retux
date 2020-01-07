import { proxyActionCreators } from 'retux'
import { StoreAction, StoreActionCatalog } from '../index'

// With Proxy an Action Creator is only created
// on the first visit and be cached for subsequence visits.
// For older browser Retux also offers
// `createActionCreators` and `declareActionCreators`.
export const action = proxyActionCreators<StoreActionCatalog>()

// You can also rewire custom action creators with anything.
const rewiredActionCreators = {
  // Also useful if you want to replace an Action Creator
  // with thunk or promise later on
  EditTodo: (id: string, text: string): StoreAction<'TodosEdit'> => ({
    type: 'TodosEdit',
    payload: { id, text }
  })
}

export const action2 = proxyActionCreators<
  StoreActionCatalog,
  typeof rewiredActionCreators
>(rewiredActionCreators)

// Or write in a conventional way
export const editTodo = (
  id: string,
  text: string
): StoreAction<'TodosEdit'> => ({
  type: 'TodosEdit',
  payload: { id, text }
})
