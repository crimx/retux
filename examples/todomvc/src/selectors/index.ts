import { createSelector } from 'reselect'
import { StoreState } from '../retux-store/modules'

const getVisibilityFilter = (state: StoreState) => state.visibilityFilter

const getTodos = (state: StoreState) => state.todos

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)

export const getCompletedTodoCount = createSelector([getTodos], todos =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
)
