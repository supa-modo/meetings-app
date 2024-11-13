// src/components/NavBar.js

import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-center container text-gray-500 font-semibold shadow-md bg-white mx-auto py-1 z-20">
      <ul className="flex space-x-14">
        <li>
          <NavLink to="/" className=" hover:text-blue-500">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/meetings"
            className="hover:text-blue-500 "
            activeClassName="text-blue-500 border-b-2 border-blue-500 pb-1"
          >
            Meetings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/directory"
            className="hover:text-blue-500 "
            activeClassName="text-blue-500 border-b-2 border-blue-500 pb-1"
          >
            Participants' Directory
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className="hover:text-blue-500 "
            activeClassName="text-blue-500 border-b-2 border-blue-500 pb-1"
          >
            Reports
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
