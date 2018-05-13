import { Table } from 'react-bootstrap';

import NewsListItem from 'components/news-list-item';

export default class NewsList extends Component {
  componentWillMount() {
    this.props.initEndlessScroll({ callback: this.props.onListBottomScroll });
  }

  render() {
    return (
      <div className="news-list">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.items.map(item => <NewsListItem
                key={item.id}
                item={item}
                onDelete={this.props.onDelete}
                onCreate={this.props.onCreate}
                onEdit={this.props.onEdit}
              />)
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
