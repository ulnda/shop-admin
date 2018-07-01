import { DateTime } from 'luxon';

import { bind } from 'decko';

import { OUTPUT_DATE_FORMAT } from 'constants/main';

export default class NewsList extends Component {  

  @bind
  onDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.item);
  }

  @bind
  onCreate(event) {
    event.preventDefault();
    this.props.onCreate(this.props.item);
  }
  
  @bind
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
