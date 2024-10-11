import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import SuspenseGlobal from "../Components/Suspense/Suspense";
import {
  Error,
  GenerateLinks,
  Home,
  ProfileDetails,
} from "../Components/Paths";
import Preview from "../Pages/Preview/Preview";
// import Error from "../Components/Error/Error";

const router = [
  {
    path: "/",
    element: (
      <SuspenseGlobal>
        <Outlet /> {/* Outlet for rendering child routes */}
      </SuspenseGlobal>
    ),
    children: [
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
      // 404
      {
        path: "*",
        element: (
          <SuspenseGlobal>
            <Error />
          </SuspenseGlobal>
        ),
      },
    ],
  },
];

const appRouter = createBrowserRouter(router);

export default appRouter;
