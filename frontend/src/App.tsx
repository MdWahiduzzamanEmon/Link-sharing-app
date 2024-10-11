import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRouter from "./constant/router";

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
