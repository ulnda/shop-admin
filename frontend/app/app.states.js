import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './app.store';

import Main from './components/main';

import Home from './views/home-views/home';
import Vacancies from './views/vacancies-views/vacancies';

const reactNode = document.getElementById('react-app');

let prevLocation = {};
history.listen(location => {
  if (location.action !== 'POP') {
    if (prevLocation.pathname !== location.pathname || prevLocation.hash !== location.hash) {
      reactNode.scrollTop = 0;
    }
  }

  prevLocation = location;
});

const component = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={Main} path="/">
        <IndexRoute component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/vacancies" component={Vacancies}/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(component, reactNode);
