import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from './retux-store'
import { App } from './components/App'

const store = createStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
