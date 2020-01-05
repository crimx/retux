import { Counter, CounterProps } from '../components/Counter'
import { connect } from 'react-redux'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToPropsFunction
} from 'react-retux'
import {
  StoreAction,
  StoreState,
  ThunkActionWithPromise,
  StoreDispatch
} from '../retux-store'
import * as action from '../retux-store/actions'

type Dispatchers = ExtractDispatchers<CounterProps, 'onClick'>

const mapStateToProps: MapStateToProps<
  StoreState,
  CounterProps,
  Dispatchers
> = state => ({
  count: state.count,
  title: 'Counter with MapDispatchToPropsFunction'
})

const mapDispatchToProps: MapDispatchToPropsFunction<
  StoreDispatch,
  CounterProps,
  Dispatchers
> = dispatch => ({
  onClick: (type, step, delay, thunk, promise) => {
    if (type === 'INCREMENT') {
      if (thunk && promise) {
        return dispatch(action.incrementDelayThunkPromise(step, delay))
      }
      if (thunk) {
        return dispatch(action.incrementDelay(step, delay))
      }
      if (promise) {
        return dispatch(action.incrementDelayPromise(step, delay))
      }
      return dispatch(action.incrementDelay(step, delay))
    }

    if (thunk && promise) {
      return dispatch(action.decrementDelayThunkPromise(step, delay))
    }
    if (thunk) {
      return dispatch(action.decrementDelay(step, delay))
    }
    if (promise) {
      return dispatch(action.decrementDelayPromise(step, delay))
    }
    return dispatch(action.decrementDelay(step, delay))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
