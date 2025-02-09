import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware ,combineReducers} from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth'
import browseReducer from './store/reducers/browse'
import cartReducer from './store/reducers/cartReducer'
import checkoutReducer from './store/reducers/checkoutReducer'
import editItemReducer from './store/reducers/editItemReducer'
import changePasswordReducer from './store/reducers/changePasswordReducer'


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combineReducers({authReducer,browseReducer,cartReducer,checkoutReducer,editItemReducer,changePasswordReducer}), composeEnhances(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
