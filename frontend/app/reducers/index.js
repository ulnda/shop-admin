import { combineReducers } from 'redux';

import { userReducer as user } from './user';

const applicationReducer = combineReducers({
  user,
});

export default applicationReducer;
