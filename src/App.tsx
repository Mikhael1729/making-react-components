import * as React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { routes } from './data/Routes';
import MainLayout from 'views/MainLayout/MainLayout';
import Sidebar from 'views/MainLayout/Sidebar/Sidebar';
import { Active, Content } from 'styles/App.module.css';

const App: React.SFC<any> = (props) => <Router>
  <Switch>
    <MainLayout>
      {routes.map((r, index) => (
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
