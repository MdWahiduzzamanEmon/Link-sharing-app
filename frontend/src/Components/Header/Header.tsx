import React from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import navLinks from "../../constant/navLinks";

const Header: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-[#FFFFFF] p-3 text-black rounded shadow-sm mt-2">
        {/* left section */}
        <h1 className="font-bold text-main_color">devLinks</h1>

        {/* middle section */}
        <section className="flex space-x-4">
          {navLinks?.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-main_color font-semibold bg-purple-100 rounded-md py-2 px-5 text-[13px]"
                  : " font-semibold hover:text-main_color hover:bg-main_light_color rounded-md py-2 px-5 bg-gray-100 text-gray-500 text-[13px]"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </section>

        {/* right section */}
        <CustomButton label="Preview" color="purple" />
      </nav>
    </>
  );
};

export default Header;