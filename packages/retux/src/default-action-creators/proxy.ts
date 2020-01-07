import {
  hasOwnProperty,
  MixedActionCreators,
  DefaultActionCreator,
  CreateDefaultActionCreator
} from '../utils'

/**
 * Lazy generate Action Creators with Proxy.
 *
 * @param createActionCreator Retux basic or fsa `createActionCreator` function.
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 */
export function proxyDefaultActionCreators<
  TCreateActionCreator extends CreateDefaultActionCreator,
  TExtra extends MixedActionCreators
>(createActionCreator: TCreateActionCreator, extraActionCreators?: TExtra) {
  return new Proxy({} as { [key: string]: DefaultActionCreator }, {
    get(memo, type: string) {
      if (!hasOwnProperty.call(memo, type)) {
        if (
          extraActionCreators &&
          hasOwnProperty.call(extraActionCreators, type)
        ) {
          memo[type] = extraActionCreators[type]
        } else {
          memo[type] = createActionCreator(type)
        }
      }
      return memo[type]
    }
  })
}
