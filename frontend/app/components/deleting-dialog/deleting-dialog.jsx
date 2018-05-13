import { Alert, Button, Modal } from 'react-bootstrap';

export default class DeletingDialog extends Component {  
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Deleting item</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>Do you really want to delete this item? This action is irreversible.</Modal.Body>
    
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.props.onDelete}>OK</Button>
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
