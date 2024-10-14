import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import dropDown from "../../assets/assets_frontend/dropdown_icon.svg";
import logo from "../../assets/assets_frontend/logo.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../server";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {isDoctor} =useSelector((state)=>state.doctor);
  const [menuOpen, setMenuOpen] = useState(false);  // State for toggling menu

  const logoutHandler = () => {
    axios
      .get(`${server}/user/user-logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-8 border-b border-gray-300">
      {/* Logo */}
      <img onClick={() => navigate("/")} className="w-36 md:w-44 cursor-pointer" src={logo} alt="Logo" />

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none">
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Navigation Links for Desktop */}
      <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          <li>HOME</li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          <li>ABOUT</li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          <li>CONTACT</li>
        </NavLink>

        {
          isDoctor ? (
            <NavLink
            to="/doc-profile"
            className=" border border-gray-300 p-2 rounded-full"
          >
            <li className=" text-gray-500 text-[13px]">Doctor Dashboard</li>
          </NavLink>
          ):(
          <NavLink
            to="/doctor-login"
            className=" border border-gray-300 p-2 rounded-full"
          >
            <li className=" text-gray-500 text-[13px]">Become Doctor</li>
          </NavLink>
          )
        }
       
      </ul>

      {/* User Profile or Login */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <img className="w-8 rounded-full" src={user?.avatar?.url} alt="" />
            <img className="w-2.5" src={dropDown} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="w-48 p-4 flex flex-col gap-4 rounded bg-stone-100">
                <p className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/profile")}>My Profile</p>
                <p className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/my-appointment")}>My Appointments</p>
                {user && user.role === "Admin" &&(
                <p className="hover:text-blue-400 cursor-pointer" onClick={() => navigate("/dashboard")}>Admin Dashboard</p>
                )}
                <p className="hover:text-blue-400 cursor-pointer" onClick={logoutHandler}>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="cursor-pointer">
            <RxAvatar size={30} />
          </button>
        )}
      </div>

      {/* Mobile Menu (for screens < 800px) */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 font-medium text-gray-700 md:hidden">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            <li>HOME</li>
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            <li>ALL DOCTORS</li>
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            <li>ABOUT</li>
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }
          >
            <li>CONTACT</li>
          </NavLink>
        {
          isDoctor ? (
            <NavLink
            to="/doc-profile"
            className=" border border-gray-300 p-2 rounded-full"
          >
            <li className=" text-gray-500 text-[13px]">Doctor Dashboard</li>
          </NavLink>
          ):(
            <NavLink
            to="/doctor-login"
            className=" border border-gray-300 p-2 rounded-full"
          >
            <li className=" text-gray-500 text-[13px]">Become Doctor</li>
          </NavLink>
          )
        }
        </ul>
      )}
    </div>
  );
};

export default Navbar;
