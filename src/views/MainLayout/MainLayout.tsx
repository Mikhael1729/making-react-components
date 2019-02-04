import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { sidebarRoutes, navbarRoutes } from "data/Routes";
import { NavLink } from "react-router-dom";
import { Active } from "styles/views/App.module.css";
import { Route } from "react-router";
import Navbar from "./Navbar/Navbar";
import ResponsiveSensor from "components/ResponsiveSensor";
import ScreenBreakPoint from "models/components/ScreenBreakPoint";
import Content from "./Content/Content";

export interface MainLayoutProps {

}

export interface MainLayoutState {
  showMenuButton: boolean;
  showSidebar: boolean;
}

export const MainLayoutContext = React.createContext({} as { isMobile: boolean, sidebarWidth: number });

class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
  constructor(props: MainLayoutProps) {
    super(props);
    this.state = {
      showMenuButton: false,
      showSidebar: true
    }
  }

  private showOrHideElements = (windowSize: number, breakPoint: ScreenBreakPoint) => {
    if (breakPoint === ScreenBreakPoint.md)
      this.setState({ showMenuButton: true, showSidebar: false })
    else if (breakPoint === ScreenBreakPoint.lg)
      this.setState({ showMenuButton: false, showSidebar: true });
  }

  private showOrHideSidebar = () => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }));

  render() {
    const { showSidebar, showMenuButton } = this.state;

    return (
      <MainLayoutContext.Provider value={{ isMobile: !this.state.showSidebar, sidebarWidth: 250 }}>
        
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

        {showMenuButton
          ?
          <button
            onClick={this.showOrHideSidebar}
            style={{
              position: 'fixed',
              bottom: "5px",
              right: "5px"
            }}
          >
            Hello
            </button>
          : null}

        {/* Content */}
        <Content>
          {this.props.children}
        </Content>

        <ResponsiveSensor callBack={this.showOrHideElements} />
      </MainLayoutContext.Provider>
    )
  }
}

export default MainLayout;