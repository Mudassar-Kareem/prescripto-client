import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../assets/assets_frontend/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const { isDoctor, doctor } = useSelector((state) => state.doctor);

  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-8 border-b border-gray-300">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-36 md:w-44 cursor-pointer"
        src={logo}
        alt="Logo"
      />
      {
        isDoctor && (
            <img
                src={`${doctor?.avatar?.url}`}
                className="w-[45px] h-[45px] cursor-pointer rounded-full object-cover border border-[#3ad132]"
                alt="User Avatar"
              />
        )
      }
    </div>
  );
};

export default Navbar;
