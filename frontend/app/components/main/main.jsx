import Header from 'components/header';

export default class Main extends Component {
  render() {
    return <div className="main">
      <Header />
      <div className="content">{this.props.children}</div>
    </div>;
  }
}
