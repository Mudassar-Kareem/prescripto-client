import { Link } from "react-router-dom";
import adminlogo from "../../assets/assets_admin/admin_logo.svg";
import { RxDashboard } from "react-icons/rx";
import { MdEvent, MdPeople } from "react-icons/md";
const Header = () => {
  return (
    <div className=" w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className=" flex items-center justify-between">
        <img src={adminlogo} alt="" />
      </div>
      <div className=" flex items-center">
        <Link to="/dashboard" className="hidden md:block">
          <RxDashboard size={30} className="mx-5 cursor-pointer"/>
        </Link>
        <Link to="/all-appointments" className=" hidden md:block">
          <MdEvent size={30} className="mx-5 cursor-pointer"/>
        </Link>
        <Link to="/doctor-list" className="  hidden md:block">
          <MdPeople size={30} className="mx-5 cursor-pointer"/>
        </Link>
      </div>
    </div>
  );
};

export default Header;
