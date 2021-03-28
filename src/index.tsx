/* eslint-disable dot-notation */
/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import authReducer from './components/auth/reducer'
import newsfeedReducer from './components/newsfeed/reducer'
import thunk from 'redux-thunk'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  newsfeed: newsfeedReducer
})

const history = createBrowserHistory()

const routerRedux = routerMiddleware(history)

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk, routerRedux)))

const app = <Provider store={store}><App /></Provider>

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
defineCustomElements(window)
