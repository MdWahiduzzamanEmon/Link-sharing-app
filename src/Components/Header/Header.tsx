import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Generate Links",
    path: "generate-links",
  },
  {
    name: "Profile Details",
    path: "profile-details",
  },
];

const Header: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between border border-gray-800 bg-gray-800 p-6">
        <h1>devLinks</h1>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <button>Preview</button>
      </nav>
    </>
  );
};

export default Header;
