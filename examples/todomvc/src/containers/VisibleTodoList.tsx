import { connect } from 'react-redux'
import { action, editTodo } from '../retux-store/actions'
import { TodoList, TodoListProp } from '../components/TodoList'
import { getVisibleTodos } from '../selectors'
import {
  ExtractDispatchers,
  MapDispatchToProps,
  MapStateToProps
} from 'react-retux'
import { StoreAction, StoreState } from '../retux-store/modules'
import { bindActionCreators } from 'redux'

type Dispatchers = ExtractDispatchers<
  TodoListProp,
  'editTodo' | 'deleteTodo' | 'completeTodo'
>

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
      editTodo: editTodo,
      deleteTodo: action.TODOS$DELETE,
      completeTodo: action.TODOS$COMPLETE
    },
    dispatch
  )

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
