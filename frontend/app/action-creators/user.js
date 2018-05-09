import store from 'app.store';

import {
  setTokenAction,
  clearTokenAction,
  setCityAction,
} from 'reducers/user';

export const setToken = token => {
  store.dispatch(setTokenAction({ token }));
};

export const clearToken = () => {
  store.dispatch(clearTokenAction());
};

export const setCity = cityId => {
  store.dispatch(setCityAction({ cityId }));
};
