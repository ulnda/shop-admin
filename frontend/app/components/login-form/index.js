import { reduxForm } from 'redux-form';

import LoginForm from './login-form';

import FORM from 'constants/forms';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = FORM.ERROR.EMPTY;
  } else if (!FORM.REGEXP.EMAIL.test(values.email)) {
    errors.email = FORM.ERROR.INVALID_FORMAT;
  }

  if (!values.password) {
    errors.password = FORM.ERROR.EMPTY;
  }

  return errors;
};

export default reduxForm({ form: FORM.NAME.LOGIN, validate })(LoginForm);