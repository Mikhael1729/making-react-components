import * as React from 'react';
import ErrorBoundary from 'helpers/ErrorBoundary';
import MainLayout from 'views/MainLayout/MainLayout';
import { navbarRoutes, sidebarRoutes } from '../../routes';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const App: React.SFC<any> = ({ }) =>
  <BrowserRouter>
    <Switch>
      <MainLayout>
        <Switch>
          <ErrorBoundary>
            {(sidebarRoutes.concat(navbarRoutes)).map((r, index) => {
              const Component = r.component;

              return (
                <Route
                  key={index}
                  path={r.path}
                  render={props => <Component {...props} />}
                  exact={r.exact}
                  strict={r.strict} />
              )
            })}
          </ErrorBoundary>
        </Switch>
      </MainLayout>
    </Switch>
  </BrowserRouter>

export default App;
