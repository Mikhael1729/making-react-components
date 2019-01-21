import * as React from 'react';
import * as Styles from "styles/views/App.module.css";

interface NavbarProps {
}

const Navbar: React.SFC<NavbarProps> = (props) => {
  return (
    <div className={Styles.Navbar}>
      <ul>
        <li>Hello 1</li>
        <li>Hello 2</li>
        <li>Hello 3</li>
        <li>Hello 3</li>
        <li>Hello 3</li>
        <li>Hello 3</li>
      </ul>
    </div>
  );
};

export default Navbar;