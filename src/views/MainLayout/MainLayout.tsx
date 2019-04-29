import navbarStyles from './Navbar/Navbar.module.scss';
import * as React from 'react';
import sidebarStyles from './Sidebar/Sidebar.module.scss';
import styles from './MainLayout.module.scss';
import { Content } from './Content';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { navbarRoutes, sidebarRoutes } from "routes";
import { NavLink } from 'react-router-dom';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { Text } from 'components/Text';

export interface MainLayoutProps { }

export interface MainLayoutState {
  showMenuButton: boolean;
  showSidebar: boolean;
}

export class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
  state: MainLayoutState = {
    showMenuButton: false,
    showSidebar: true
  }

  render() {
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
            <Button key={index}>
              <NavLink
                to={r.path}
                exact={r.exact}
                strict={r.strict}
              >
                <Icon name={r.icon} />
                <Text>{r.label}</Text>
              </NavLink>
            </Button>
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
