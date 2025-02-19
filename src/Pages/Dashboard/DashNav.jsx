import React from "react";
import { FaHome, FaPager, FaPlus, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const DashNav = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="mr-[5px]">
      <div className="drawer z-10 lg:drawer-open rounded-lg overflow-hidden">
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
            
              <>
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
            <li>
              <NavLink
                className="flex gap-2 text-[16px] m-3"
                to="/dashboard/addpublisher"
              >
                <FaPlus></FaPlus>
                All Publisher
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 text-[16px] m-3"
                to="/dashboard/allarticles"
              >
                <FaPager></FaPager>
                All Articles
              </NavLink>
            </li>
              </>
            <li>
              <NavLink
                className="flex gap-2 text-[16px] m-3"
                to="/myprofile"
              >
                <FaUser></FaUser>
                Admin Profile
              </NavLink>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
