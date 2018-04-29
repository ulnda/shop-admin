import { createStore, applyMiddleware, compose } from 'redux';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';

import applicationReducers from './reducers';

/* eslint-disable no-underscore-dangle */
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(thunk);
/* eslint-enable no-underscore-dangle */

const store = createStore(applicationReducers, {}, enhancers);

export const history = useRouterHistory(createHistory)({ basename: '/' });
export default store;
