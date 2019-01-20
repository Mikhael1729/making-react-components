import NestedRoutes from "views/NestedRoutes/NestedRoutes";
import { IRoute } from "models/IRoute";
import TestArea from "views/TestArea/TestArea";
import { testData } from "./TestRepository";
import * as React from "react";
import Mockup from "views/Mockup/Mockup";
import GenericThings from "views/GenericThings/GenericThings";
import Home from "views/Home/Home";
import Route from "models/Route";

export const routes: Route[] = [
  new Route({ path: "/", label: "Inicio", component: Home }),
  new Route({ path: "/generic-things", label: "Cosas genéricas", component: GenericThings }),
  new Route({ path: "/test-area", label: "Área de pruebas", component: () => <TestArea data={testData}/>}),
  new Route({ path: "/nested-routes", label: "Rutas anidadas", component: NestedRoutes }),
  new Route({ path: "/mockup", label: "Aprende CSS", component: Mockup }),
]