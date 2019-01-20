import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routes } from './data/Routes';
import MainLayout from 'views/MainLayout/MainLayout';

const App: React.SFC<any> = (props) => <Router>
  <MainLayout>
    {routes.map((r, index) => (
      <Route key={index} path={r.path} component={r.component} {...r}/>
    ))}
  </MainLayout>
</Router>

export default App;
