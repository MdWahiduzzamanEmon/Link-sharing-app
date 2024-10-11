import React from "react";

const Error: React.FC = () => {
  return (
    <>
      {/* //404 */}
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <div className="text-white text-4xl">404</div>
        <div className="text-white text-2xl">Page not found</div>
      </main>
    </>
  );
};

export default Error;
