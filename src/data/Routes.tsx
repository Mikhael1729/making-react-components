import NestedRoutes from "views/NestedRoutes/NestedRoutes";
import { IRoute } from "models/IRoute";
import TestArea from "views/TestArea/TestArea";
import { testData } from "./TestRepository";
import * as React from "react";
import Mockup from "views/Mockup/Mockup";
import GenericThings from "views/GenericThings/GenericThings";

export const routes: IRoute[] = [
  { path: "/generic-things", label: "Cosas genéricas", component: GenericThings },
  { path: "/test-area", label: "Área de pruebas", component: () => <TestArea data={testData}/>},
  { path: "/nested-routes", label: "Rutas anidadas", component: NestedRoutes },
  { path: "/mockup", label: "Aprende CSS", component: Mockup },
];
