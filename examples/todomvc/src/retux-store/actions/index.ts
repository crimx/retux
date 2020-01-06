import { createActionCreators, combineUniqueObjects } from 'retux'
import { actionHandlers as todoActionHandlers } from '../modules/todos'
import { actionHandlers as visibilityFilterActionHandlers } from '../modules/visibilityFilter'
import { StoreAction } from '../index'

export const action = createActionCreators(
  // Auto-generated Action creators!
  // Strongly typed and also customizable.
  // Also if you don't use Redux's combineReducers you can move this code to
  // the index and create a single combined state and reducer for all modules
  // then export the combined action handlers back here.
  combineUniqueObjects(visibilityFilterActionHandlers, todoActionHandlers)
)

export const editTodo = (
  id: string,
  text: string
): StoreAction<'TodosEdit'> => ({
  type: 'TodosEdit',
  payload: { id, text }
})
