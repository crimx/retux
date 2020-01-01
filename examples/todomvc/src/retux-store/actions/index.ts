import { createActionCreators, combineUniqueObjects } from 'retux'
import { actionHandlers as todoActionHandlers } from '../modules/todos'
import { actionHandlers as visibilityFilterActionHandlers } from '../modules/visibilityFilter'

// Auto generate Action creators!
// Strongly typed and also customizable.

export const action = combineUniqueObjects(
  createActionCreators(todoActionHandlers),
  createActionCreators(visibilityFilterActionHandlers)
)
