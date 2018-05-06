import { connect } from 'react-redux';

import Login from './login';

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Login);
