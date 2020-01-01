import { createActionCreators, combineUniqueObjects } from 'retux'
import { actionHandlers as todoActionHandlers } from '../modules/todos'
import { actionHandlers as visibilityFilterActionHandlers } from '../modules/visibilityFilter'

// Auto generate Action creators!
// Strongly typed and also customizable.

export const action = combineUniqueObjects(
  createActionCreators(todoActionHandlers, {
    'TODOS/EDIT': (id: string, text: string) =>
      ({
        type: 'TODOS/EDIT',
        payload: { id, text }
      } as const)
  }),
  createActionCreators(visibilityFilterActionHandlers)
)
