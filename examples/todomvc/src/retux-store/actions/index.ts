import { defineActionCreators } from 'retux'
import { StoreAction, StoreActionCatalog } from '../index'

// This proxies all the action creators!
// For older browser Retux also offers `createActionCreators`.
export const action = defineActionCreators<StoreActionCatalog>()

// Custom action creators
export const editTodo = (
  id: string,
  text: string
): StoreAction<'TodosEdit'> => ({
  type: 'TodosEdit',
  payload: { id, text }
})
