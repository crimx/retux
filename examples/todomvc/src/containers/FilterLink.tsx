import { connect } from 'react-redux'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'
import { action } from '../retux-store/actions'
import { Link, LinkProps } from '../components/Link'
import { StoreState, StoreAction } from '../retux-store/modules'
import { VisibilityFilter } from '../utilities/visibility'
import { PropsWithChildren } from 'react'

type Dispatchers = ExtractDispatchers<LinkProps, 'setFilter'>

export interface FilterLinkProps {
  filter: VisibilityFilter
}

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
  setFilter: () => {
    dispatch(action.VISIBILITY_FILTER$SET(ownProps.filter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)
