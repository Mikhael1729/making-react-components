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
        <li>
          <a>
            <span className="icon-pencil2"></span>
            &nbsp;Escribe
          </a>
        </li>
        <li>
          <a>
            <span className="icon-pencil2"></span>
            &nbsp;Escribe
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;