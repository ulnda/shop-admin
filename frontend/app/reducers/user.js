import { createAction, handleActions } from 'redux-actions';

export const setTokenAction = createAction('SET_TOKEN'); 
export const clearTokenAction = createAction('CLEAR_TOKEN');

export const setCityAction = createAction('SET_CITY');

export const userReducer = handleActions({
  [setTokenAction](state, { payload: { token } }) {
    return {
      ...state,
      token,
    };
  },
  [clearTokenAction](state) {
    return {
      ...state,
      token: '',
    };
  },
  [setCityAction](state, { payload: { cityId } }) {
    return {
      ...state,
      cityId,
    };
  },
}, {});
