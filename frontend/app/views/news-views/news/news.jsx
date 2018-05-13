import { Col } from 'react-bootstrap';

import NewsList from 'components/news-list';

import DeletingDialog from 'components/deleting-dialog';

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onNewsItemDelete = this.onNewsItemDelete.bind(this);
    this.onNewsItemEdit = this.onNewsItemEdit.bind(this);
    this.onNewsItemCreate = this.onNewsItemCreate.bind(this);
    
    this.onNewsDeletingCancel = this.onNewsDeletingCancel.bind(this);
    this.onNewsDelete = this.onNewsDelete.bind(this);
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

  onNewsItemDelete(item) {
    this.item = item;
    this.setState({ isDeletingDialogShow: true });
  }

  onNewsItemEdit(item) {
    this.props.router.push(`news/${item.id}/edit`);
  }

  onNewsItemCreate(item) {
    this.props.router.push(`news/${item.id}/new`);
  }

  onNewsDelete() {
    console.log(this.item.id);
    this.hideNewsDeletingDialog();
  }

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
