import { Col } from 'react-bootstrap';

import LoginForm from 'components/login-form';

import * as userActions from 'action-creators/user';

export default class Login extends Component {
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
        <LoginForm onSubmit={this.onSubmit}/>
      </Col>
    );
  }
}

