import { connect } from 'react-redux'
import { Header } from '../components/Header'
import { action } from '../retux-store/actions'

export default connect(null, { addTodo: action.TODOS$ADD })(Header)
