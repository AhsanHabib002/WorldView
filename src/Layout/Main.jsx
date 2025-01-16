import { Outlet } from "react-router-dom";
import Navabar from "../SharedComponents/Navabar";

const Main = () => {
  return (
    <div>
      <Navabar></Navabar>
      <div className="max-w-[1440px] mx-auto px-4 md:px-[30px]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
