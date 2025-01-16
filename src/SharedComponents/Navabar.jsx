import { Link, NavLink } from "react-router-dom";

const Navabar = () => {
  return (
    <>
      <div className=" bg-black text-white">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a className="font-cinzel font-extrabold text-[3vw] lg:text-[1.2vw]">
              WorldView Daily
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex gap-4">
              <NavLink to="/" className="text-[16px]">Home</NavLink>
              <NavLink to="/" className="text-[16px]">Add Articles</NavLink>
              <NavLink to="/" className="text-[16px]">All Articles</NavLink>
              <NavLink to="/" className="text-[16px]">Subscription</NavLink>
              <NavLink to="/" className="text-[16px]">Dashboard</NavLink>
              <NavLink to="/" className="text-[16px]">My Articles</NavLink>
              <NavLink to="/" className="text-[16px]">Premium Articles</NavLink>
            </ul>
          </div>
          <div className="navbar-end  gap-4">
            <Link to="/">
            <button className="btn bg-white text-black">Login</button>
            </Link>
            <Link to="/">
            <button className="btn btn-outline border-white text-white">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navabar;
