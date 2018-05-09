import { FormControl, HelpBlock } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return <div>
      <FormControl.Feedback />
      <HelpBlock>{this.props.error}</HelpBlock>
    </div>
  }
}