import { connect } from 'react-redux'
import { Link, LinkProps } from '../components/Link'
import { StoreState, StoreAction } from '../retux-store/modules'
import { PropsWithChildren } from 'react'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'

export interface FilterLinkProps {
  filter: StoreState['visibilityFilter']
}

type Dispatchers = ExtractDispatchers<LinkProps, 'onClick'>

const mapStateToProps: MapStateToProps<
  StoreState,
  LinkProps,
  Dispatchers,
  PropsWithChildren<FilterLinkProps>
> = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  LinkProps,
  Dispatchers,
  PropsWithChildren<FilterLinkProps>
> = (dispatch, ownProps) => ({
  onClick: () =>
    dispatch({ type: 'VISIBILITY_FILTER$SET', payload: ownProps.filter })
})

export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link)
