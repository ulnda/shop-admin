import { DateTime } from 'luxon';

import { OUTPUT_DATE_FORMAT } from 'constants/main';

export default class NewsList extends Component {  
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.item);
  }

  onCreate(event) {
    event.preventDefault();
    this.props.onCreate(this.props.item);
  }
  
  onEdit(event) {
    event.preventDefault();
    this.props.onEdit(this.props.item);
  }

  formatDate(date) {
    return DateTime.fromMillis(Date.parse(date)).toFormat(OUTPUT_DATE_FORMAT);
  }
  
  render() {
    const { title, description, isActive, createdAt, updatedAt } = this.props.item;

    return (
      <tr className={isActive ? 'published' : 'archived'}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{this.formatDate(createdAt)}</td>
        <td>{this.formatDate(updatedAt)}</td>
        <td>
          <a href="#" onClick={this.onCreate}>New</a>
          <a href="#" onClick={this.onEdit}>Edit</a>
          <a href="#" onClick={this.onDelete}>Delete</a>
        </td>
      </tr>
    );
  }
}
