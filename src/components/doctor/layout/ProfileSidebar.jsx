import { useSelector } from "react-redux";
import { AiOutlineLogin } from "react-icons/ai";
import { MdEvent } from "react-icons/md";
import { server } from "../../../server";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ProfileSidebar = ({ active, setActive }) => {
  const { doctor } = useSelector((state) => state.doctor);
  const navigate = useNavigate()
  
  const logoutHandler = () =>{
    axios.get(`${server}/doctor/logout-doctor`,{withCredentials:true}).then((res)=>{
        toast.success(res.data.message),
        navigate("/doctor-login")
    })
    .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <div className="w-full h-full bg-white shadow-sm p-4 pt-16">
      <div
        className="flex items-center  cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        {doctor && (
          <img
            src={`${doctor.avatar.url}`}
            alt="Doctor Avatar"
            className="h-[45px] w-[45px] rounded-full"
          />
        )}
        <span
          className={`pl-3 font-semibold ${
            active === 1 ? "text-[red]" : ""
          } hidden md:block`} // md:block is used here to show on screens larger than 768px
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center  cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <MdEvent size={25} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 font-semibold ${
            active === 2 ? "text-[red]" : ""
          } hidden md:block`} // md:block is used here to show on screens larger than 768px
        >
          Appointment
        </span>
      </div>

      <div
        className="single_item flex items-center  cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={25} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 font-semibold ${
            active === 8 ? "text-[red]" : ""
          } hidden md:block`} // md:block is used here to show on screens larger than 768px
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
