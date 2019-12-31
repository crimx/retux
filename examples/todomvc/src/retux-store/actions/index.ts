import { createActionCreators, mergeUniqueObjects } from 'retux'
import { actionHandlers as todoActionHandlers } from '../modules/todos'
import { actionHandlers as visibilityFilterActionHandlers } from '../modules/visibilityFilter'

// Auto generate Action creators!
// Strongly typed and customizable.

export const action = mergeUniqueObjects(
  createActionCreators(todoActionHandlers),
  createActionCreators(visibilityFilterActionHandlers)
)
