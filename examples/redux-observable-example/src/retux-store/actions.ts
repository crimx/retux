import { proxyActionCreators } from 'retux'
import { storeActionHandlers } from './modules'

export const action = proxyActionCreators(storeActionHandlers)
