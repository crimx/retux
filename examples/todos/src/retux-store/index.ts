import { createStore as createReduxStore } from 'redux'
import { rootReducer } from './modules'

/** Redux store setup */
export const createStore = () => createReduxStore(rootReducer)
