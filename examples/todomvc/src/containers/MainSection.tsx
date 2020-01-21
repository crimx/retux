import { connect } from 'react-redux'
import { MainSection, MainSectionProps } from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'
import { StoreState, StoreAction } from '../retux-store/modules'
import { action } from '../retux-store/actions'

type Dispatchers = ExtractDispatchers<
  MainSectionProps,
  'completeAllTodos' | 'clearCompleted'
>

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
  completeAllTodos: action.TODOS$COMPLETE_ALL,
  clearCompleted: action.TODOS$CLEAR_COMPLETED
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSection)
