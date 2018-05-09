import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';

import Profile from './profile';

import FORM from 'constants/forms';

const mapStateToProps = state => ({
  [FORM.NAME.PROFILE]: getFormValues(FORM.NAME.PROFILE)(state),
});

export default connect(mapStateToProps)(Profile);
