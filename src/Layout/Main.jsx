import { Outlet, useLocation } from "react-router-dom";
import Navabar from "../SharedComponents/Navabar";

const Main = () => {
  const location = useLocation();
  const noNavFoot = location.pathname.includes("login");
  return (
    <div>
      {noNavFoot || <Navabar></Navabar>}
      <div className="max-w-[1440px] mx-auto px-4 md:px-[30px]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
