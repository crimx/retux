import { connect } from 'react-redux'
import { action } from '../retux-store/actions'
import { TodoList, TodoListProp } from '../components/TodoList'
import { getVisibleTodos } from '../selectors'
import { MapDispatchToProps, MapStateToProps } from 'retux'
import { StoreAction, StoreState } from '../retux-store'

type Dispatchers = 'editTodo' | 'deleteTodo' | 'completeTodo'

const mapStateToProps: MapStateToProps<
  StoreState,
  TodoListProp,
  Dispatchers
> = state => ({
  filteredTodos: getVisibleTodos(state)
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  TodoListProp,
  Dispatchers
> = dispatch => ({
  editTodo: (id, text) => dispatch(action['TODOS/EDIT']({ id, text })),
  deleteTodo: id => dispatch(action['TODOS/DELETE'](id)),
  completeTodo: id => dispatch(action['TODOS/COMPLETE'](id))
})

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
