import { proxyActionCreators, proxyCombineObjects } from 'retux'
import { StoreAction } from '../index'
import { actionHandlers as todosHandlers } from '../modules/todos'
import { actionHandlers as visibilityFilterHandlers } from '../modules/visibilityFilter'

// With Proxy an Action Creator is only created
// on the first visit and be cached for subsequence visits.
// For older browser Retux also offers
// `createActionCreators`.
export const action = proxyActionCreators(
  // If you have state-shared modules this can also be defined
  // at store root then import it to here.
  proxyCombineObjects(todosHandlers, visibilityFilterHandlers),
  {
    // You can rewire custom action creators with anything.
    // Also useful if you want to replace an Action Creator
    // with thunk or promise later on
    TodosEdit: (id: string, text: string): StoreAction<'TodosEdit'> => ({
      type: 'TodosEdit',
      payload: { id, text }
    })
  }
)

// Or write in a conventional way
export const editTodo = (
  id: string,
  text: string
): StoreAction<'TodosEdit'> => ({
  type: 'TodosEdit',
  payload: { id, text }
})
