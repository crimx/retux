import { connect } from 'react-redux'
import { TodoList, TodoListProps } from '../components/TodoList'
import { StoreAction, StoreState } from '../retux-store/modules'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'

type Dispatchers = ExtractDispatchers<TodoListProps, 'toggleTodo'>

const mapStateToProps: MapStateToProps<
  StoreState,
  TodoListProps,
  Dispatchers
> = state => ({
  todos: getVisibleTodos(state)
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  TodoListProps,
  Dispatchers
> = dispatch => ({
  toggleTodo: (id: string) => dispatch({ type: 'TODOS$TOGGLE', payload: id })
})

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

function getVisibleTodos(state: StoreState): StoreState['todos'] {
  switch (state.visibilityFilter) {
    case 'SHOW_ALL':
      return state.todos
    case 'SHOW_COMPLETED':
      return state.todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return state.todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + state.visibilityFilter)
  }
}
