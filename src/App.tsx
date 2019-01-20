import * as React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { routes } from './data/Routes';
import { Content, Navbar, Active, Brand, Title, Subtitle } from "styles/App.module.css";
import Sidebar from 'views/MainLayout/Sidebar/Sidebar';
import MainLayout from 'views/MainLayout/MainLayout';

const App: React.SFC<any> = (props) => <Router>
  <MainLayout>
    {routes.map((r, index) => (
      <Route key={index} path={r.path} component={r.component} />
    ))}
  </MainLayout>
</Router>

export default App;
