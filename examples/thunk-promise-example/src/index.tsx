import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from './retux-store'
import { App } from './components/App'

import 'bulma/css/bulma.css'

const store = createStore()

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
)
