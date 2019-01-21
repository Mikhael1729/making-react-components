import { init } from "helpers/init";

class Route {
  path: string = "";
  label?: string;
  component?: any;
  strict?: boolean;
  exact?: boolean;
  icon?: string;

  constructor(data: Route) {
    init<Route>(this, data);
  }
}

export default Route;