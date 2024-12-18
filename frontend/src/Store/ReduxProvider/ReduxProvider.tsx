import React from "react";
import { Provider } from "react-redux";
import { store } from "../Store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
