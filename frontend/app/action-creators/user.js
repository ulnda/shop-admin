import store from 'app.store';

import {
  setCredentialsAction,
  clearCredentialsAction,
} from 'reducers/user';

export const setCredentials = credentials => {
  store.dispatch(setCredentialsAction({ credentials }));
};

export const clearCredentials = () => {
  store.dispatch(clearCredentialsAction());
};
