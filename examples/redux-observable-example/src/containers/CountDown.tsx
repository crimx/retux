import { connect } from 'react-redux'
import { CountDown, CountDownProps } from '../components/CountDown'
import { StoreState } from '../retux-store/modules'
import { MapStateToProps } from 'react-retux'

const mapStateToProps: MapStateToProps<StoreState, CountDownProps> = state => ({
  isPinging: state.isPinging
})

export default connect(mapStateToProps)(CountDown)
