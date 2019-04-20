import NestedRoutes from "views/NestedRoutes/NestedRoutes";
import TestArea from "views/TestArea/TestArea";
import { testData } from "./data/repository";
import * as React from "react";
import Mockup from "views/Mockup/Mockup";
import GenericThings from "views/GenericThings/GenericThings";
import Home from "views/Home/Home";
import Route from "models/Route";
import Writes from "views/Writes/Writes";
import Posts from "views/Publications/Posts";

export const sidebarRoutes: Route[] = [
  { path: "/", label: "Inicio", component: Home, exact: true },
  { path: "/generic-things", label: "Cosas genéricas", component: GenericThings },
  { path: "/test-area", label: "Área de pruebas", component: () => <TestArea data={testData} /> },
  { path: "/nested-routes", label: "Rutas anidadas", component: NestedRoutes },
  { path: "/mockup", label: "Aprende CSS", component: Mockup },
  { path: "/posts", label: "Publicaciones", component: Posts },
]

export const navbarRoutes: Route[] = [
  { path: "/writer", label: "Escribe", component: Writes, icon:"icon-pencil2" }
]