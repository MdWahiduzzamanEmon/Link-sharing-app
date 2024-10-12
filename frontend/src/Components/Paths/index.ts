import React from "react";

const Home = React.lazy(() => import("../../Pages/Home/Home"));
const Error = React.lazy(() => import("../../Components/Error/Error"));
const GenerateLinks = React.lazy(
  () => import("../../Pages/Home/GenerateLinks/GenerateLinks")
);

const ProfileDetails = React.lazy(
  () => import("../../Pages/Home/ProfileDetails/ProfileDetails")
);

const Preview = React.lazy(() => import("../../Pages/Preview/Preview"));
const Login = React.lazy(
  () => import("../../Pages/Authentication/Login/Login")
);
const Register = React.lazy(
  () => import("../../Pages/Authentication/Register/Register")
);

export { Home, Error, GenerateLinks, ProfileDetails, Preview, Login, Register };
