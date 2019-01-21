import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { sidebarRoutes, navbarRoutes } from "data/Routes";
import { NavLink } from "react-router-dom";
import { Active, Content } from "styles/views/App.module.css";
import { Route } from "react-router";
import Navbar from "./Navbar/Navbar";

export interface MainLayoutProps {

}

export interface MainLayoutState {

}

class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
  render() {
    return <>
      {/* Navigation Controls */}
      <Sidebar>
        {sidebarRoutes.map((r, index) => (
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

      {/* Navbar */}
      <Navbar>
        {navbarRoutes.map((r, index) => (
          <li key={index}>
            <NavLink
              to={r.path}
              activeClassName={Active}
              exact={r.exact}
              strict={r.strict}
            >
              <span className={r.icon} />
              <span>&nbsp;{r.label}</span>
            </NavLink>
          </li>
        ))}
      </Navbar>

      {/* Content */}
      <main className={Content}>
        {this.props.children}
      </main>
    </>
  }
}

export default MainLayout;