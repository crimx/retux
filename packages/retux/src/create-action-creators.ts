import { CreateDefaultActionCreator, hasOwnProperty } from './utils'

/**
 * Generate Action Creators.
 *
 * @param createActionCreator Create single Action Creator.
 * @param actionHandlers Retux Action Handlers.
 * @param extraAcionCreators Extra Action Creators.
 *                           Can overwrite generated Action Creators.
 */
export function createActionCreators<
  TCreator extends CreateDefaultActionCreator,
  THandlers extends {},
  TExtra extends { [key: string]: any }
>(
  createActionCreator: TCreator,
  actionHandlers: THandlers,
  extraAcionCreators?: TExtra
): {
  [type in Exclude<keyof THandlers, keyof TExtra>]: ReturnType<TCreator>
} &
  TExtra
export function createActionCreators(
  createActionCreator: CreateDefaultActionCreator,
  actionHandlers: {},
  extraAcionCreators?: { [key: string]: any }
) {
  const result: { [key: string]: any } = {}

  if (extraAcionCreators) {
    for (const type in extraAcionCreators) {
      /* istanbul ignore else */
      if (hasOwnProperty.call(extraAcionCreators, type)) {
        result[type] = extraAcionCreators[type]
      }
    }
  }

  for (const type in actionHandlers) {
    /* istanbul ignore else */
    if (hasOwnProperty.call(actionHandlers, type)) {
      if (!hasOwnProperty.call(result, type)) {
        result[type] = createActionCreator(type)
      }
    }
  }

  return result
}
