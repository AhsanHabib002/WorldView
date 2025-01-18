import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const DashNav = () => {
  return (
    <div className="mr-[5px]">
      <div className="drawer lg:drawer-open rounded-lg overflow-hidden">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-black text-white drawer-button lg:hidden"
          >
            Menu
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-black text-white min-h-full w-64 p-4">
            {/* Sidebar content here */}
            <li>
              <NavLink className="flex gap-2 text-[16px] m-3" to="/dashboard">
                <FaHome></FaHome> Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 text-[16px] m-3"
                to="/dashboard/alluser"
              >
                <FaUserGroup></FaUserGroup>
                All User
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
