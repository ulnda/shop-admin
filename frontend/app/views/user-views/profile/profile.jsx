import { Col } from 'react-bootstrap';

import ProfileForm from 'components/profile-form';

import * as userActions from 'action-creators/user';

export default class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
  }

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

