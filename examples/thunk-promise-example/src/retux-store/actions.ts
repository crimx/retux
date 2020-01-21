import { createActionCreators } from 'retux'
import {
  storeActionHandlers,
  StoreAction,
  ThunkAction,
  ThunkActionWithPromise
} from './modules'

export const action = createActionCreators(storeActionHandlers)

export const incrementDelay = (
  step: number,
  delay: number
): ThunkAction => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'COUNTER$INCREMENT', payload: step })
  }, delay)
}

export const decrementDelay = (
  step: number,
  delay: number
): ThunkAction => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'COUNTER$DECREMENT', payload: step })
  }, delay)
}

/// We can also restrict the dispatchable action types

export const incrementDelayRestrict = (
  step: number,
  delay: number
): ThunkAction<'COUNTER$INCREMENT'> => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'COUNTER$INCREMENT', payload: step })
  }, delay)
}

export const decrementDelayRestrict = (
  step: number,
  delay: number
): ThunkAction<'COUNTER$DECREMENT'> => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'COUNTER$DECREMENT', payload: step })
  }, delay)
}

/// Redux-Promise

export const incrementDelayPromise = (
  step: number,
  delay: number
): Promise<StoreAction<'COUNTER$INCREMENT'>> =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ type: 'COUNTER$INCREMENT', payload: step }),
      delay
    )
  )

export const decrementDelayPromise = (
  step: number,
  delay: number
): Promise<StoreAction<'COUNTER$DECREMENT'>> =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ type: 'COUNTER$DECREMENT', payload: step }),
      delay
    )
  )

/// Redux-Thunk with Redux-Promise

export const incrementDelayThunkPromise = (
  step: number,
  delay: number
): ThunkActionWithPromise<'COUNTER$INCREMENT'> => dispatch => {
  dispatch({ type: 'COUNTER$INCREMENT', payload: step })
  dispatch(
    new Promise<StoreAction<'COUNTER$INCREMENT'>>(resolve =>
      setTimeout(
        () => resolve({ type: 'COUNTER$INCREMENT', payload: step }),
        delay
      )
    )
  )
}

export const decrementDelayThunkPromise = (
  step: number,
  delay: number
): ThunkActionWithPromise<'COUNTER$DECREMENT'> => dispatch => {
  dispatch({ type: 'COUNTER$DECREMENT', payload: step })
  dispatch(
    new Promise<StoreAction<'COUNTER$DECREMENT'>>(resolve =>
      setTimeout(
        () => resolve({ type: 'COUNTER$DECREMENT', payload: step }),
        delay
      )
    )
  )
}
