import { init } from "helpers/init";

class Route {
  path: string = "";
  label?: string = undefined;
  component?: any = undefined;
  strict?: boolean = true;
  exact?: boolean = true;

  constructor(data: Route) {
    init<Route>(this, data);
  }
}

export default Route;