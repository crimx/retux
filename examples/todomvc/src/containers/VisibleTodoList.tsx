import { connect } from 'react-redux'
import { action } from '../retux-store/actions'
import { TodoList, TodoListProp } from '../components/TodoList'
import { getVisibleTodos } from '../selectors'
import { MapDispatchToProps, MapStateToProps } from 'react-retux'
import { StoreAction, StoreState } from '../retux-store'
import { bindActionCreators } from 'redux'

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
> = dispatch =>
  bindActionCreators(
    {
      editTodo: action.editTodo,
      deleteTodo: action.TodosDelete,
      completeTodo: action.TodosComplete
    },
    dispatch
  )

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
