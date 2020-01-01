import { connect } from 'react-redux'
import { MainSection, MainSectionProps } from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import { MapStateToProps, MapDispatchToProps } from 'retux'
import { StoreState, StoreAction } from '../retux-store'
import { action } from '../retux-store/actions'

type Dispatchers = 'completeAllTodos' | 'clearCompleted'

const mapStateToProps: MapStateToProps<
  StoreState,
  MainSectionProps,
  Dispatchers
> = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  MainSectionProps,
  Dispatchers
> = {
  completeAllTodos: action['TODOS/COMPLETE_ALL'],
  clearCompleted: action['TODOS/CLEAR_COMPLETED']
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSection)
