import { reduxForm } from 'redux-form';

import ProfileForm from './profile-form';

import FORM from 'constants/forms';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = FORM.ERROR.EMPTY;
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = FORM.ERROR.EMPTY;
  }

  if (values.password && values.passwordConfirmation && (values.password != values.passwordConfirmation)) {
    errors.passwordConfirmation = FORM.ERROR.INCORRECT_CONFIRMATION;
  }

  return errors;
};

export default reduxForm({ form: FORM.NAME.PROFILE, validate })(ProfileForm);