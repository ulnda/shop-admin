import { Row, Col, Form, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

import { Field } from 'redux-form';

import getFormState from 'utils/helpers/get-form-state';

export default class ProfileForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);

    this.setupFormComponents();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit();

    if (!this.props.invalid) this.props.onSubmit();
  }

  setupFormComponents() {
    this.passwordComponent = ({ mods, input: { onChange, value }, meta: { error, touched } }) =>
      <FormGroup controlId="formHorizontalPassword" validationState={getFormState(touched && error)}>
        <Col componentClass={ControlLabel} sm={4}>Password</Col>
        <Col sm={8}>
          <FormControl type="password" placeholder="Password" onChange={onChange} value={value}/>
          {touched && <HelpBlock>{error}</HelpBlock>}
        </Col>
      </FormGroup>;

    this.passwordConfirmationComponent = ({ mods, input: { onChange, value }, meta: { error, touched } }) =>
      <FormGroup controlId="formHorizontalPasswordConfirmation" validationState={getFormState(touched && error)}>
        <Col componentClass={ControlLabel} sm={4}>Password Confirmation</Col>
        <Col sm={8}>
          <FormControl type="password" placeholder="Password" onChange={onChange} value={value}/>
          {touched && <HelpBlock>{error}</HelpBlock>}
        </Col>
      </FormGroup>;
  }

  render() {
    return (
      <Form horizontal>
        <Field
          name="password"
          data={''}
          component={this.passwordComponent}
        />

        <Field
          name="passwordConfirmation"
          data={''}
          component={this.passwordConfirmationComponent}
        />

        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Button type="submit" onClick={this.onSubmit}>Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}