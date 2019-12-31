import { DefaultAction } from './utils'

/**
 * Generate Action Creators with signature:
 * (payload?, meta?, error?) => Action | Function | Promise
 *
 * @param actionHandlers Retux Action Handlers.
 * @param extraAcionCreators Extra Action Creators.
 *                           Can overwrite generated Action Creators.
 *                           Can return Thunk or Promise actions.
 */
export function createActionCreators<
  AH extends {},
  AC extends {
    [T: string]: (...args: any[]) => DefaultAction | Function | Promise<any>
  }
>(actionHandlers: AH, extraAcionCreators?: AC) {
  const result = {} as {
    [T: string]: (...args: any[]) => DefaultAction | Function | Promise<any>
  }

  if (extraAcionCreators) {
    for (const type in extraAcionCreators) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(extraAcionCreators, type)) {
        /* istanbul ignore else */
        if (extraAcionCreators[type]) {
          result[type] = extraAcionCreators[type]
        }
      }
    }
  }

  for (const type in actionHandlers) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(actionHandlers, type)) {
      if (!Object.prototype.hasOwnProperty.call(result, type)) {
        result[type] = (...args) => {
          switch (args.length) {
            case 0:
              return { type }
            case 1:
              return { type, payload: args[0] }
            case 2:
              return { type, payload: args[0], meta: args[1] }
            default:
              return { type, payload: args[0], meta: args[1], error: args[2] }
          }
        }
      }
    }
  }

  return result
}
