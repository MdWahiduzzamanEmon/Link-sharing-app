import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SuspenseGlobal from "../Components/Suspense/Suspense";
import {
  Error,
  GenerateLinks,
  Home,
  Login,
  Preview,
  ProfileDetails,
  Register,
} from "../Components/Paths";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = [
  {
    path: "/",
    element: <Navigate to="generate-links" />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <SuspenseGlobal>
          <Home />
        </SuspenseGlobal>
      </PrivateRoute>
    ),
    children: [
      //Links
      {
        path: "generate-links",
        element: (
          <SuspenseGlobal>
            <GenerateLinks />
          </SuspenseGlobal>
        ),
      },
      //profile details
      {
        path: "profile-details",
        element: (
          <SuspenseGlobal>
            <ProfileDetails />
          </SuspenseGlobal>
        ),
      },
    ],
  },

  // Preview
  {
    path: "preview",
    element: (
      <PrivateRoute>
        <SuspenseGlobal>
          <Preview />
        </SuspenseGlobal>
      </PrivateRoute>
    ),
  },

  //authentication
  {
    path: "login",
    element: (
      <SuspenseGlobal>
        <Login />
      </SuspenseGlobal>
    ),
  },
  {
    path: "register",
    element: (
      <SuspenseGlobal>
        <Register />
      </SuspenseGlobal>
    ),
  },
  // 404
  {
    path: "*",
    element: (
      <SuspenseGlobal>
        <Error />
      </SuspenseGlobal>
    ),
  },
];

const appRouter = createBrowserRouter(router);

export default appRouter;
