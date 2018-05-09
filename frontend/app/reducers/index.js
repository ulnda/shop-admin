import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import { userReducer as user } from './user';

const applicationReducer = combineReducers({
  user,
  form,
});

export default applicationReducer;
