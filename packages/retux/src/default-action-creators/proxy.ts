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
 * @param actionHandlers Retux Action Handlers.
 * @param extraActionCreators Overwrite some of the generated
 * Action Creators or add more.
 */
export function proxyDefaultActionCreators<
  TCreateActionCreator extends CreateDefaultActionCreator,
  THandlers extends {},
  TExtra extends MixedActionCreators = MixedActionCreators
>(
  createActionCreator: TCreateActionCreator,
  actionHandlers: THandlers,
  extraActionCreators?: TExtra
) {
  let cachedOwnKeys: Set<string> | undefined

  return new Proxy({} as { [key: string]: DefaultActionCreator }, {
    get(memo, type: string) {
      if (hasOwnProperty.call(memo, type)) {
        return memo[type]
      }

      if (
        extraActionCreators &&
        hasOwnProperty.call(extraActionCreators, type)
      ) {
        return (memo[type] = extraActionCreators[type])
      }

      if (hasOwnProperty.call(actionHandlers, type)) {
        return (memo[type] = createActionCreator(type))
      }
    },
    ownKeys() {
      if (!cachedOwnKeys) {
        cachedOwnKeys = new Set([
          ...Object.keys(actionHandlers),
          ...Object.keys(extraActionCreators || {})
        ])
      }
      return [...cachedOwnKeys]
    },
    getOwnPropertyDescriptor(memo, type: string) {
      if (hasOwnProperty.call(memo, type)) {
        return { value: memo[type], configurable: true, enumerable: true }
      }

      if (
        extraActionCreators &&
        hasOwnProperty.call(extraActionCreators, type)
      ) {
        memo[type] = extraActionCreators[type]
        return { value: memo[type], configurable: true, enumerable: true }
      }

      if (hasOwnProperty.call(actionHandlers, type)) {
        memo[type] = createActionCreator(type)
        return { value: memo[type], configurable: true, enumerable: true }
      }
    }
  })
}
