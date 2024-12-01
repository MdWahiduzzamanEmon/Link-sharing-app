// import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import leftImage from "../../assets/leftImage.png";

const Home = () => {
  return (
    <>
      <Header />
      {/* //make two grid section. right section will be bigger then left section. have some gap between two. in mobile right section will stay and left will be hidden */}
      <section className="my-4 grid gap-5 ">
        <div
          className="hidden bg-white overflow-y-auto p-5 rounded-lg shadow-sm 
         lg:col-span-1 items-center justify-center lg:flex lg:col-start-1 lg:col-end-2 lg:row-span-1 lg:row-start-1 lg:row-end-2
        "
        >
          <img
            src={leftImage}
            alt="DevLinks"
            className="object-cover rounded-xl "
            loading="lazy"
          />
        </div>
        <div
          className="bg-white overflow-y-auto p-5 rounded-lg shadow-sm
           lg:col-span-6 lg:col-start-2 lg:col-end-8 lg:row-span-1 lg:row-start-1 lg:row-end-2
        "
        >
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Home;
