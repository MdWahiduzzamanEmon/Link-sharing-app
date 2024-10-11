import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseGlobal from "../Components/Suspense/Suspense";
import { Error, GenerateLinks, Home } from "../Components/Paths";
// import Error from "../Components/Error/Error";

const router = [
  {
    path: "/",
    children: [
      {
        path: "/",
        index: true,
        element: (
          <SuspenseGlobal>
            <Home />
          </SuspenseGlobal>
        ),
      },
      //Links
      {
        path: "/generate-links",
        element: (
          <SuspenseGlobal>
            <GenerateLinks />
          </SuspenseGlobal>
        ),
      },

      //profile details

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
