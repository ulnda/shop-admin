import { Row, Col, Form, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';

import * as userActions from 'action-creators/user';

const EMAIL_REGEXP = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.onEnter = this.onEnter.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(event) {
    userActions.setCredentials({ email: event.target.value });
  }

  onPasswordChange(event) {
    userActions.setCredentials({ password: event.target.value });
  }

  onEnter(event) {
    event.preventDefault();
    userActions.clearCredentials();
    this.props.router.push('/');
  }

  render() {
    const { email, password } = this.props.user;

    const isReady = email && password && email.match(EMAIL_REGEXP);

    return (
      <Col sm={6} smOffset={3}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" onChange={this.onEmailChange} value={email}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" onChange={this.onPasswordChange} value={password}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this.onEnter} disabled={!isReady}>Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

