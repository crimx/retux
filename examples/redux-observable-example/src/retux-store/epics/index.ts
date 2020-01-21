import { combineEpics } from 'redux-observable'
import { pingEpic } from './ping'

export const rootEpic = combineEpics(pingEpic)
