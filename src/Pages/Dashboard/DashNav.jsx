import React from "react";
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
            <NavLink className="text-[16px] m-3" to="/dashboard">Admin Home</NavLink>
            <NavLink className="text-[16px] m-3" to="/dashboard/alluser">All User</NavLink>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
