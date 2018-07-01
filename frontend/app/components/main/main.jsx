import { Grid } from 'react-bootstrap';

import ComponentsFabric from 'utils/services/components-fabric';

const CITY_LS_PARAM = '__city_ls_param';

export default class Main extends Component {  
  componentWillMount() {
    const cityFromLS = localStorage.getItem(CITY_LS_PARAM);
  }

  render() {
    const Header = ComponentsFabric.getHeader();

    return <div className="main">
      <Header />
      <Grid>{this.props.children}</Grid>
    </div>;
  }
}
