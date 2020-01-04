import {
  createActionCreators,
  combineUniqueObjects,
  ActionHandlers
} from 'retux'
import { actionHandlers as todoActionHandlers } from '../modules/todos'
import { actionHandlers as visibilityFilterActionHandlers } from '../modules/visibilityFilter'

export const action = createActionCreators(
  // Auto-generated Action creators!
  // Strongly typed and also customizable.
  combineUniqueObjects(visibilityFilterActionHandlers, todoActionHandlers),
  // Custom action creators start with lowercase which are easy to identify
  {
    editTodo: (id: string, text: string) =>
      ({
        type: 'TodosEdit',
        payload: { id, text }
      } as const)
  }
)
