import {
  ActionHandlers,
  GetStateFromHandlersList,
  GetActionCatalogFromHandlersList
} from '../basic/types'
import {
  ActionHandlers as FSAHandlers,
  GetStateFromHandlersList as GetStateFromFSAHandlersList,
  GetActionCatalogFromHandlersList as GetActionCatalogFromFSAHandlersList
} from '../fsa/types'
import { IntersectionFromUnion } from '../utils'

/**
 * Returns a union of number indices from an array.
 * @template TArr Array
 */
type ExtractIndices<
  TArr extends any[],
  TIndex extends keyof TArr = keyof TArr
> = TIndex extends keyof [] ? never : TIndex

/**
 * Returns a union excluding specific items from an array.
 *
 * @template TArr Array
 * @template TTargetIndex Union of excluded indices
 */
type ExcludeArrayItem<
  TArr extends any[],
  TTargetIndex extends keyof TArr,
  TIndex extends keyof TArr = ExtractIndices<TArr>
> = TIndex extends keyof TArr
  ? TIndex extends TTargetIndex
    ? never
    : TArr[TIndex]
  : never

/**
 * Find duplicated keys of two objects.
 * `true` if there are duplicate keys,
 * `never` otherwise.
 *
 * @template TObj1
 * @template TObj2
 */
type DuplicatedKeysInTwoObjects<
  TObj1,
  TObj2,
  TKey1 extends keyof TObj1 = keyof TObj1
> = TKey1 extends keyof TObj1
  ? TKey1 extends keyof TObj2
    ? true
    : never
  : never

/**
 * Find duplicated keys in an array of objects.
 * `true` if there are duplicate keys,
 * `never` otherwise.
 *
 * @template TArr Array
 */
export type DuplicatedKeysInObjects<
  TArr extends any[],
  TIndices extends keyof TArr = ExtractIndices<TArr>,
  TIndex extends TIndices = TIndices
> = TIndex extends keyof TArr
  ? DuplicatedKeysInTwoObjects<
      TArr[TIndex],
      IntersectionFromUnion<ExcludeArrayItem<TArr, TIndex>>
    >
  : never

// never
type Result = DuplicatedKeysInObjects<
  [{ a: string }, { b: string; c: string }, { d: string }]
>

// true
type Result2 = DuplicatedKeysInObjects<
  [{ a: string }, { b: string; c: string }, { c: number }]
>

/**
 * If it is a list of Action Handlers, extract ActionCatalogs from them,
 * merge the ActionCatalogs then wrap the ActionHandler back.
 *
 * So that the resulted object is not losing index signature.
 *
 * @template TObject Union of Object
 */
export type WrapResultInHandlers<TObject> = GetActionCatalogFromHandlersList<
  TObject
> extends never
  ? GetActionCatalogFromFSAHandlersList<TObject> extends never
    ? IntersectionFromUnion<TObject>
    : GetStateFromFSAHandlersList<TObject> extends never
    ? IntersectionFromUnion<TObject>
    : FSAHandlers<
        GetStateFromFSAHandlersList<TObject>,
        IntersectionFromUnion<GetActionCatalogFromFSAHandlersList<TObject>>
      >
  : GetStateFromHandlersList<TObject> extends never
  ? IntersectionFromUnion<TObject>
  : ActionHandlers<
      GetStateFromHandlersList<TObject>,
      IntersectionFromUnion<GetActionCatalogFromHandlersList<TObject>>
    >
