import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './app.store';

import Main from './components/main';

import Home from './views/home-views/home';

import Vacancies from './views/vacancies-views/vacancies';

import Profile from './views/user-views/profile';

import Login from './views/auth-views/login';
import Registration from './views/auth-views/registration';

import * as userActions from 'action-creators/user';

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

        <Route path="/profile" component={Profile}/>

        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
        <Route path="/logout" onEnter={onLogout}/>
      </Route>
    </Router>
  </Provider>
);

function onLogout(nextState, replace) {
  userActions.clearToken();

  replace('/login');
}

ReactDOM.render(component, reactNode);
