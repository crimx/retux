import {
  hasOwnProperty,
  MixedActionCreators,
  CreateDefaultActionCreator
} from '../utils'

/**
 * Generate Action Creators.
 *
 * @param createActionCreator Retux basic or fsa `createActionCreator` function.
 * @param actionHandlers Retux Action Handlers.
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 */
export function createDefaultActionCreators<
  TCreateActionCreator extends CreateDefaultActionCreator,
  THandlers extends {},
  TExtra extends MixedActionCreators = MixedActionCreators
>(
  createActionCreator: TCreateActionCreator,
  actionHandlers: THandlers,
  extraActionCreators?: TExtra
) {
  const result: { [type: string]: (...args: any) => any } = {}

  if (extraActionCreators) {
    for (const type in extraActionCreators) {
      /* istanbul ignore else */
      if (hasOwnProperty.call(extraActionCreators, type)) {
        result[type] = extraActionCreators[type]
      }
    }
  }

  for (const type in actionHandlers) {
    /* istanbul ignore else */
    if (hasOwnProperty.call(actionHandlers, type)) {
      if (!extraActionCreators || !hasOwnProperty.call(result, type)) {
        result[type] = createActionCreator(type)
      }
    }
  }

  return result
}
