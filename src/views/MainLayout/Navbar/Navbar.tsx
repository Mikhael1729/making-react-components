import * as React from 'react';
import * as Styles from "styles/views/App.module.css";
import { RouteComponentProps, withRouter } from 'react-router';

interface NavbarProps extends RouteComponentProps {
}

const Navbar: React.SFC<NavbarProps> = (props) => {
  console.log(props);
  return (
    <div className={Styles.Navbar}>
      <div className={Styles.Brand}>
        Inicio
      </div>
      <ul>
        {props.children}
      </ul>
    </div>
  );
};

export default withRouter(Navbar);