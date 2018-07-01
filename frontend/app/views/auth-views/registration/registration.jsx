import { Col } from 'react-bootstrap';

import { bind } from 'decko';

import RegistrationForm from 'components/registration-form';

import * as userActions from 'action-creators/user';

export default class Registration extends Component {

  @bind
  onSubmit() {
    this.props.router.push('/');
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <RegistrationForm onSubmit={this.onSubmit}/>
      </Col>
    );
  }
}

