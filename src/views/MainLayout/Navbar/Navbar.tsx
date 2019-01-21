import * as React from 'react';
import * as Styles from "styles/views/App.module.css";
import { RouteComponentProps, withRouter } from 'react-router';
import { sidebarRoutes, navbarRoutes } from "data/Routes";

interface NavbarProps extends RouteComponentProps {
}

const Navbar: React.SFC<NavbarProps> = (props) => {
  const title = extractTitle(props.location.pathname);

  return (
    <div className={Styles.Navbar}>
      <div className={Styles.Brand}>
        {title}
      </div>
      <ul>
        {props.children}
      </ul>
    </div>
  );
};

const extractTitle = (pathname: string): string => {
  const routes = sidebarRoutes.concat(navbarRoutes);
  const route = routes.find(r => r.path === pathname);
  const title = route ? route.label ? route.label : "" : "";

  return title;
}

export default withRouter(Navbar);