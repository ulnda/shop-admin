import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './app.store';

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
    </Router>
  </Provider>
);

ReactDOM.render(component, reactNode);
