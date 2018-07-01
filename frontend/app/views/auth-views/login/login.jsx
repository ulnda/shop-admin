import { Col } from 'react-bootstrap';

import { bind } from 'decko';

import LoginForm from 'components/login-form';

import * as userActions from 'action-creators/user';

export default class Login extends Component {

  @bind
  onSubmit() {
    this.props.router.push('/');
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <LoginForm onSubmit={this.onSubmit}/>
      </Col>
    );
  }
}

