import React, { Suspense } from "react";
import Loader from "../../Shared/Loader/Loader";

interface SuspenseProps {
  children: React.ReactNode;
}

const SuspenseGlobal: React.FC<SuspenseProps> = ({ children }) => {
  if (typeof window !== "undefined") {
    return <Suspense fallback={<Loader />}>{children}</Suspense>;
  }
  return null;
};

export default SuspenseGlobal;
