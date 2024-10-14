import { MdEvent, MdOutlinePeople, MdPeople } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const SideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/all-appointments" className="w-full flex items-center">
          <MdEvent size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Appointment
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/doctor-list" className="w-full flex items-center">
          <MdPeople size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Doctors
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/all-user" className="w-full flex items-center">
          <MdOutlinePeople size={30} color={`${active === 4 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All User
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
