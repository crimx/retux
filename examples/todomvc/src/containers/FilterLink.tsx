import { connect } from 'react-redux'
import { MapStateToProps, MapDispatchToProps } from 'retux'
import { action } from '../retux-store/actions'
import { Link, LinkProps } from '../components/Link'
import { StoreState, StoreAction } from '../retux-store'
import { VisibilityFilter } from '../utilities/visibility'
import { PropsWithChildren } from 'react'

type Dispatchers = 'setFilter'

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
    dispatch(action['VISIBILITY_FILTER/SET'](ownProps.filter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)
