import store from './index';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

const bindMiddleware = middleware => {
  return composeWithDevTools(applyMiddleware(...middleware));
};

const initStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, bindMiddleware([thunkMiddleware]));
};

export const reduxWrapper = createWrapper(initStore, { debug: true });
