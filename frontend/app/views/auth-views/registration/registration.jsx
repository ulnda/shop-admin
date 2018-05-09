import { Col } from 'react-bootstrap';

import RegistrationForm from 'components/registration-form';

import * as userActions from 'action-creators/user';

export default class Registration extends Component {
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
        <RegistrationForm onSubmit={this.onSubmit}/>
      </Col>
    );
  }
}

