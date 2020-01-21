import { mapTo, switchMap } from 'rxjs/operators'
import { timer } from 'rxjs'

// Helpers that are tailored for the store
import { Epic, ofType } from './utils'

export const pingEpic: Epic<'PINGPONG$PONG'> = action$ =>
  action$.pipe(
    ofType('PINGPONG$PING'),
    // correctly infer 'PINGPONG$PING' action
    switchMap(({ payload: delay = 1000 }) => timer(delay)),
    mapTo({ type: 'PINGPONG$PONG' })
  )
