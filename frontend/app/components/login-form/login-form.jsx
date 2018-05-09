import { Row, Col, Form, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

import { Field } from 'redux-form';

import getFormState from 'utils/helpers/get-form-state';

export default class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);

    this.setupFormComponents();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  setupFormComponents() {
    this.emailComponent = ({ mods, input: { onChange, value }, meta: { error } }) =>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>Email</Col>
        <Col sm={10}>
          <FormControl type="email" placeholder="Email" onChange={onChange} value={value}/>
        </Col>
      </FormGroup>;

    this.passwordComponent = ({ mods, input: { onChange, value }, meta: { error } }) =>
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>Password</Col>
        <Col sm={10}>
          <FormControl type="password" placeholder="Password" onChange={onChange} value={value}/>
        </Col>
      </FormGroup>;
  }

  render() {
    return (
      <Form horizontal>
        <Field
          name="email"
          data={''}
          component={this.emailComponent}
        />

        <Field
          name="password"
          data={''}
          component={this.passwordComponent}
        />

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.onSubmit} disabled={this.props.invalid}>Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}