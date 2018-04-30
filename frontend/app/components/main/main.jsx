import Header from 'components/header';

const CITY_LS_PARAM = "__city_ls_param";

export default class Main extends Component {  
  componentWillMount() {
    const cityFromLS = localStorage.getItem(CITY_LS_PARAM);
  }

  render() {
    return <div className="main">
      <Header />
      <div className="content">{this.props.children}</div>
    </div>;
  }
}
