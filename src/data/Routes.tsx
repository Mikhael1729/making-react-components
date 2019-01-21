import NestedRoutes from "views/NestedRoutes/NestedRoutes";
import TestArea from "views/TestArea/TestArea";
import { testData } from "./repository";
import * as React from "react";
import Mockup from "views/Mockup/Mockup";
import GenericThings from "views/GenericThings/GenericThings";
import Home from "views/Home/Home";
import Route from "models/Route";

export const sidebarRoutes: Route[] = [
  { path: "/", label: "Inicio", component: Home, exact: true },
  { path: "/generic-things", label: "Cosas genéricas", component: GenericThings },
  { path: "/test-area", label: "Área de pruebas", component: () => <TestArea data={testData} /> },
  { path: "/nested-routes", label: "Rutas anidadas", component: NestedRoutes },
  { path: "/mockup", label: "Aprende CSS", component: Mockup },
]

export const navbarRoutes: Route[] = [
  { path: "/writer", label: "Escribe", component: GenericThings, icon:"icon-pencil2" }
]