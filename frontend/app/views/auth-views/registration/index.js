import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';

import Registration from './registration';

import FORM from 'constants/forms';

const mapStateToProps = state => ({
  [FORM.NAME.REGISTRATION]: getFormValues(FORM.NAME.REGISTRATION)(state),
});

export default connect(mapStateToProps)(Registration);
