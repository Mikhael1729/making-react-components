import * as React from 'react';
import * as Styles from "styles/views/App.module.css";

interface NavbarProps {
}

const Navbar: React.SFC<NavbarProps> = (props) => {
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

export default Navbar;