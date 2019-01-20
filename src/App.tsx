import * as React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { routes } from './data/Routes';
import { Content, Navbar, Active, Brand, Title, Subtitle } from "styles/App.module.css";

const App: React.SFC<any> = (props) => <Router>
  <>
    {/* Navigation Controls */}
    <nav className={Navbar}>
      <div className={Brand}>
        <span className={Title}>&lt;Mikhael /&gt;</span>  
        <span className={Subtitle}>Codificando mundos</span>
      </div>
      <ul>
        {routes.map((r, index) => (
          <li key={index}>
            <NavLink to={r.path} activeClassName={Active}>{r.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>

    {/* Pages */}
    <main className={Content}>
      {routes.map((r, index) => (
        <Route key={index} path={r.path} component={r.component} />
      ))}
    </main>
  </>
</Router>

export default App;
