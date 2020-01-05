import { Counter, CounterProps } from '../components/Counter'
import { connect } from 'react-redux'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToPropsObject
} from 'react-retux'
import { StoreAction, StoreState, ThunkActionWithPromise } from '../retux-store'
import * as action from '../retux-store/actions'

type Dispatchers = ExtractDispatchers<CounterProps, 'onClick'>

const mapStateToProps: MapStateToProps<
  StoreState,
  CounterProps,
  Dispatchers
> = state => ({
  count: state.count,
  title: 'Counter with MapDispatchToPropsObject'
})

const mapDispatchToProps: MapDispatchToPropsObject<
  StoreAction | ThunkActionWithPromise | Promise<StoreAction>,
  CounterProps,
  Dispatchers
> = {
  onClick: (type, step, delay, thunk, promise) => {
    if (type === 'INCREMENT') {
      if (thunk && promise) {
        return action.incrementDelayThunkPromise(step, delay)
      }
      if (thunk) {
        return action.incrementDelay(step, delay)
      }
      if (promise) {
        return action.incrementDelayPromise(step, delay)
      }
      return action.incrementDelay(step, delay)
    }

    if (thunk && promise) {
      return action.decrementDelayThunkPromise(step, delay)
    }
    if (thunk) {
      return action.decrementDelay(step, delay)
    }
    if (promise) {
      return action.decrementDelayPromise(step, delay)
    }
    return action.decrementDelay(step, delay)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
