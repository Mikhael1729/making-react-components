import * as React from 'react';
import MainLayout from 'views/MainLayout/MainLayout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { navbarRoutes, sidebarRoutes } from '../../routes';

const App: React.SFC<any> = (props) => <Router>
  <Switch>
    <MainLayout>
      {(sidebarRoutes.concat(navbarRoutes)).map((r, index) => (
        <Route
          key={index}
          path={r.path}
          component={r.component}
          exact={r.exact}
          strict={r.strict} />
      ))}
    </MainLayout>
  </Switch>
</Router>

export default App;
