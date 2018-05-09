import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';

import Login from './login';

import FORM from 'constants/forms';

const mapStateToProps = state => ({
  [FORM.NAME.LOGIN]: getFormValues(FORM.NAME.LOGIN)(state),
});

export default connect(mapStateToProps)(Login);
