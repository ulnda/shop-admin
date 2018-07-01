import { Col } from 'react-bootstrap';

import { bind } from 'decko';

import NewsList from 'components/news-list';

import DeletingDialog from 'components/deleting-dialog';

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.news = [
      {
        id: 1,
        isActive: true,
        title: 'Some title Some title Some title Some title',
        description: 'Some description',
        createdAt: '2018-05-02 02:46:47.561+04',
        updatedAt: '2018-05-02 02:46:47.561+04',
      },
      {
        id: 2,
        isActive: false,
        title: 'Some title Some title Some title Some title',
        description: 'Some description',
        createdAt: '2018-05-02 02:46:47.561+04',
        updatedAt: '2018-05-02 02:46:47.561+04',
      },
    ];
  }

  hideNewsDeletingDialog() {
    this.setState({ isDeletingDialogShow: false });
  }

  @bind
  onNewsItemDelete(item) {
    this.item = item;
    this.setState({ isDeletingDialogShow: true });
  }

  @bind
  onNewsItemEdit(item) {
    this.props.router.push(`news/${item.id}/edit`);
  }

  @bind
  onNewsItemCreate(item) {
    this.props.router.push(`news/${item.id}/new`);
  }

  @bind
  onNewsDelete() {
    this.hideNewsDeletingDialog();
  }

  @bind
  onNewsDeletingCancel() {
    this.hideNewsDeletingDialog();
  }

  render() {
    return (
      <Col sm={10} smOffset={1}>
        <NewsList
          items={this.news}
          onDelete={this.onNewsItemDelete}
          onEdit={this.onNewsItemEdit}
          onCreate={this.onNewsItemCreate}
        />

        { this.state.isDeletingDialogShow && <DeletingDialog
          onDelete={this.onNewsDelete}
          onCancel={this.onNewsDeletingCancel}
        /> }
      </Col>
    );
  }
}
