import { reduxForm } from 'redux-form';

import RegistrationForm from './registration-form';

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

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = FORM.ERROR.EMPTY;
  }

  if (values.password && values.passwordConfirmation && (values.password != values.passwordConfirmation)) {
    errors.passwordConfirmation = FORM.ERROR.INCORRECT_PASSWORD_CONFIRMATION;
  }

  return errors;
};

export default reduxForm({ form: FORM.NAME.REGISTRATION, validate })(RegistrationForm);