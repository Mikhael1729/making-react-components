import { Navbar as NavbarComponent } from "./Navbar";
import { withRouter } from "react-router";
import NavbarStyles from "./Navbar.module.scss";

const Navbar = withRouter<any>(NavbarComponent);

export {
  Navbar,
  NavbarStyles,
};
