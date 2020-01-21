import { connect } from 'react-redux'
import { PingPong, PingPongProps } from '../components/PingPong'
import { StoreState, StoreAction } from '../retux-store/modules'
import {
  ExtractDispatchers,
  MapStateToProps,
  MapDispatchToProps
} from 'react-retux'
import { action } from '../retux-store/actions'

type Dispatchers = ExtractDispatchers<PingPongProps, 'sendPing'>

const mapStateToProps: MapStateToProps<
  StoreState,
  PingPongProps,
  Dispatchers
> = state => ({
  isPinging: state.isPinging
})

const mapDispatchToProps: MapDispatchToProps<
  StoreAction,
  PingPongProps,
  Dispatchers
> = {
  sendPing: action.PINGPONG$PING
}

export default connect(mapStateToProps, mapDispatchToProps)(PingPong)
