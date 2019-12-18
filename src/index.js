import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import Nav from './components/Nav'
import getRouter from './router'
import {Provider} from 'react-redux'
import store from './redux/store'
import '../mock/mock.js'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Nav/>
      {getRouter()}
    </Router>
  </Provider>
  ,
  document.getElementById('app')
)