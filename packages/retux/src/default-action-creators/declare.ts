import {
  hasOwnProperty,
  MixedActionCreators,
  CreateDefaultActionCreator
} from '../utils'

/**
 * Lazy generate Action Creators with function.
 *
 * @param createActionCreator Retux basic or fsa `createActionCreator` function.
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 */
export function declareDefaultActionCreators<
  TCreateActionCreator extends CreateDefaultActionCreator,
  TExtra extends MixedActionCreators
>(createActionCreator: TCreateActionCreator, extraActionCreators?: TExtra) {
  const memo: { [type: string]: (...args: any) => any } = {}

  return (type: string) => {
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
}
