import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { sidebarRoutes, navbarRoutes } from "data/Routes";
import { NavLink } from "react-router-dom";
import { Active } from "views/App/App.module.scss";
import { Route } from "react-router";
import Navbar from "./Navbar/Navbar";
import ResponsiveSensor from "components/ResponsiveSensor/ResponsiveSensor";
import ScreenBreakPoint from "models/ScreenBreakPoint";
import Content from "./Content/Content";
import Button from "components/Button/Button";
import * as styles from "./MainLayout.module.scss";
import * as sidebarStyles from "./Sidebar/Sidebar.module.scss";
import * as navbarStyles from "./Navbar/Navbar.module.scss";
import * as appStyles from "../App/App.module.scss";

export interface MainLayoutProps {

}

export interface MainLayoutState {
  showMenuButton: boolean;
  showSidebar: boolean;
}

export const MainLayoutContext = React.createContext({} as { isMobile: boolean, sidebarWidth: number });

class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
  state: MainLayoutState = {
    showMenuButton: false,
    showSidebar: true
  }

  private showOrHideSidebar = () => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }));

  private computeModel = () => {
    return { ...this.state, ...styles }
  }

  render() {
    const { showMenuButton } = this.computeModel();

    return (
      <>
        {/* Navigation Controls */}
        <Sidebar>
          {sidebarRoutes.map((r, index) => (
            <li key={index}>
              <NavLink
                to={r.path}
                activeClassName={sidebarStyles.Active}
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
                activeClassName={navbarStyles.Active}
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
        <Content>
          {this.props.children}
        </Content>
      </>
    )
  }
}

export default MainLayout;