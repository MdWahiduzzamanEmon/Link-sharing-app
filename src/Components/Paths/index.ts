import React from "react";

const Home = React.lazy(() => import("../../Pages/Home/Home"));
const Error = React.lazy(() => import("../../Components/Error/Error"));
const GenerateLinks = React.lazy(
  () => import("../../Components/GenerateLinks/GenerateLinks")
);

export { Home, Error, GenerateLinks };
