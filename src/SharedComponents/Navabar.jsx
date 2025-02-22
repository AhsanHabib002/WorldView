import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import usePremiumUser from "../Hooks/usePremiumUser";
import { useEffect, useState } from "react";

const Navabar = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const { userPremium, isLoading } = usePremiumUser();
  const isPremium = userPremium?.isPremium;

  // dark
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-theme"
  );

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const togglebutton = () => {
    const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <div className=" bg-black text-white sticky top-0 z-50">
        <div className="navbar max-w-[1440px] mx-auto px-4 md:px-[30px]">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-black rounded-box z-[5] mt-3 w-52 p-2 shadow-md"
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/articles">All Articles</NavLink>
                </li>
                <li>
                  <NavLink to="/subscription">Subscription</NavLink>
                </li>
                <button
                  onClick={togglebutton}
                  className=" theme-toggle-btn font-medium mx-3"
                >
                  {theme === "light-theme" ? "Dark" : "Light"}
                </button>
                {user && (
                  <>
                    <li>
                      <NavLink to="/addarticles">Add Articles</NavLink>
                    </li>
                    <li>
                      <NavLink to="/myarticles">My Articles</NavLink>
                    </li>
                    {isPremium && (
                      <li>
                        <NavLink to="/premium">Premium Articles</NavLink>
                      </li>
                    )}
                    {/* <li>
                      <NavLink to="/myprofile">Profile</NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/dashboard" className="text-[16px]">
                        Dashboard
                      </NavLink>
                    </li>
                  </>
                )}

                {/* {isAdmin && (
                  <li>
                    <NavLink to="/dashboard" className="text-[16px]">
                      Dashboard
                    </NavLink>
                  </li>
                )} */}
              </ul>
            </div>
            <a className="font-cinzel font-extrabold text-[3vw] lg:text-[1.2vw]">
              WorldView Daily
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex gap-4">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/articles">All Articles</NavLink>
              </li>
              <li>
                <NavLink to="/subscription">Subscription</NavLink>
              </li>
              <button
                onClick={togglebutton}
                className=" theme-toggle-btn font-medium mx-3"
              >
                {theme === "light-theme" ? "Dark" : "Light"}
              </button>
              {user && (
                <>
                  <li>
                    <NavLink to="/addarticles">Add Articles</NavLink>
                  </li>

                  <li>
                    <NavLink to="/myarticles">My Articles</NavLink>
                  </li>
                  {isPremium && (
                    <li>
                      <NavLink to="/premium">Premium Articles</NavLink>
                    </li>
                  )}
                  {/* <li>
                    <NavLink to="/myprofile">Profile</NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/dashboard" className="text-[16px]">
                      Dashboard
                    </NavLink>
                  </li>
                </>
              )}

              {/* {isAdmin && (
                <li>
                  <NavLink to="/dashboard" className="text-[16px]">
                    Dashboard
                  </NavLink>
                </li>
              )} */}
            </ul>
          </div>
          <div className="navbar-end  gap-4">
            {user && user?.email ? (
              <>
                <div className="flex items-center gap-2">
                  <Link>
                    <button className="btn btn-ghost btn-circle">
                      <div className="w-10 rounded-full">
                        <img
                          className="w-10 h-10 rounded-full cursor-pointer"
                          alt={user.displayName}
                          src={user.photoURL}
                        />
                      </div>
                    </button>
                  </Link>
                  <div>
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn bg-white text-black">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-outline border-white text-white">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navabar;
