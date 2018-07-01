import { Col } from 'react-bootstrap';

import { bind } from 'decko';

import ProfileForm from 'components/profile-form';

import * as userActions from 'action-creators/user';

export default class Profile extends Component {

  @bind
  onSubmit() {
    this.props.router.push('/');
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <ProfileForm onSubmit={this.onSubmit}/>
      </Col>
    );
  }
}

