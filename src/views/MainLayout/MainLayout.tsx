import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { routes } from "data/Routes";
import { NavLink } from "react-router-dom";
import { Active, Content } from "styles/App.module.css";
import { Route } from "react-router";

export interface MainLayoutProps {

}

export interface MainLayoutState {

}

class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
  render() {
    return <>
      {/* Navigation Controls */}
      <Sidebar>
        {routes.map((r, index) => (
          <li key={index}>
            <NavLink
              to={r.path}
              activeClassName={Active}
              exact={r.exact}
              strict={r.strict}
            >
              {r.label}
            </NavLink>
          </li>
        ))}
      </Sidebar>

      {/* Content */}
      <main className={Content}>
        {this.props.children}
      </main>
    </>
  }
}

export default MainLayout;