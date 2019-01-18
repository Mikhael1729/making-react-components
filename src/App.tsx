import * as React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { routes } from './data/Routes';

class App extends React.Component {
  render() {
    return <BrowserRouter>
      <>
        {/* Navigation Controls */}
        <nav>
          <ul>
            {routes.map((r, index) => (
              <li key={index}>
                <Link to={r.path}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </nav>;
      
        {/* Pages */}
        <main style={{ padding: "20px" }}>
          {routes.map((r, index) => (
            <Route key={index} path={r.path} component={r.component} />
          ))}
        </main>
      </>
    </BrowserRouter>
  }
}

export default App;
