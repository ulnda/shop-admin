import { createAction, handleActions } from 'redux-actions';

export const setCredentialsAction = createAction('SET_CREDENTIALS');
export const clearCredentialsAction = createAction('CLEAR_CREDENTIALS');

export const setTokenAction = createAction('SET_TOKEN'); 
export const clearTokenAction = createAction('CLEAR_TOKEN');

export const setCity = createAction('SET_CITY');

const DEFAULT_CREDENTIALS = {
  email: '',
  password: '',
};

const DEFAULT_TOKEN = {
  token: '',
};

export const userReducer = handleActions({
  [setCredentialsAction](state, { payload: { credentials } }) {
    return {
      ...state,
      ...credentials,
    };
  },
  [clearCredentialsAction](state) {
    return {
      ...state,
      ...DEFAULT_CREDENTIALS,
    };
  },
  [setTokenAction](state, { payload: { token } }) {
    return {
      ...state,
      token,
    };
  },
  [clearTokenAction](state, { payload: { token } }) {
    return {
      ...state,
      ...DEFAULT_TOKEN,
    };
  },
  [setCity](state, { payload: { cityId } }) {
    return {
      ...state,
      cityId,
    };
  },
}, { 
  ...DEFAULT_CREDENTIALS,
  ...DEFAULT_TOKEN,
 });
