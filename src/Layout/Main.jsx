import { Outlet, useLocation } from "react-router-dom";
import Navabar from "../SharedComponents/Navabar";
import Footer from "../SharedComponents/Footer";

const Main = () => {
  const location = useLocation();
  const noNavFoot = location.pathname.includes("login"&&"register");
  return (
    <div>
      {noNavFoot || <Navabar></Navabar>}
      <div className="max-w-[1440px] mx-auto px-4 md:px-[30px]">
        <Outlet></Outlet>
      </div>
      {noNavFoot || <Footer></Footer>}
    </div>
  );
};

export default Main;
