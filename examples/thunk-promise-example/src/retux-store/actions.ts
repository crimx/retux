import { createActionCreators } from 'retux'
import {
  storeActionHandlers,
  StoreAction,
  ThunkAction,
  ThunkActionWithPromise
} from './index'

export const action = createActionCreators(storeActionHandlers)

export const incrementDelay = (
  step: number,
  delay: number
): ThunkAction => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'INCREMENT', payload: step })
  }, delay)
}
export const decrementDelay = (
  step: number,
  delay: number
): ThunkAction => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'DECREMENT', payload: step })
  }, delay)
}

// We can also restrict the dispatchable action types
export const incrementDelayRestrict = (
  step: number,
  delay: number
): ThunkAction<'INCREMENT'> => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'INCREMENT', payload: step })
  }, delay)
}
export const decrementDelayRestrict = (
  step: number,
  delay: number
): ThunkAction<'DECREMENT'> => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'DECREMENT', payload: step })
  }, delay)
}

// Redux-Promise
export const incrementDelayPromise = (
  step: number,
  delay: number
): Promise<StoreAction<'INCREMENT'>> =>
  new Promise(resolve =>
    setTimeout(() => resolve({ type: 'INCREMENT', payload: step }), delay)
  )
export const decrementDelayPromise = (
  step: number,
  delay: number
): Promise<StoreAction<'DECREMENT'>> =>
  new Promise(resolve =>
    setTimeout(() => resolve({ type: 'DECREMENT', payload: step }), delay)
  )

// Redux-Thunk with Redux-Promise
export const incrementDelayThunkPromise = (
  step: number,
  delay: number
): ThunkActionWithPromise<'INCREMENT'> => dispatch => {
  dispatch({ type: 'INCREMENT', payload: step })
  dispatch(
    new Promise<StoreAction<'INCREMENT'>>(resolve =>
      setTimeout(() => resolve({ type: 'INCREMENT', payload: step }), delay)
    )
  )
}
export const decrementDelayThunkPromise = (
  step: number,
  delay: number
): ThunkActionWithPromise<'DECREMENT'> => dispatch => {
  dispatch({ type: 'DECREMENT', payload: step })
  dispatch(
    new Promise<StoreAction<'DECREMENT'>>(resolve =>
      setTimeout(() => resolve({ type: 'DECREMENT', payload: step }), delay)
    )
  )
}
