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

const router = [
  {
    path: "/",
    element: <Navigate to="generate-links" />,
  },
  {
    path: "/",
    element: (
      <SuspenseGlobal>
        <Home />
      </SuspenseGlobal>
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
      <SuspenseGlobal>
        <Preview />
      </SuspenseGlobal>
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
