import React from "react";

const Home = React.lazy(() => import("../../Pages/Home/Home"));
const Error = React.lazy(() => import("../../Components/Error/Error"));
const GenerateLinks = React.lazy(
  () => import("../../Pages/Home/GenerateLinks/GenerateLinks")
);

const ProfileDetails = React.lazy(
  () => import("../../Pages/Home/ProfileDetails/ProfileDetails")
);

export { Home, Error, GenerateLinks, ProfileDetails };
