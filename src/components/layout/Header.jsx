import headerimg from "../../assets/assets_frontend/header_img.png";
import groupImg from "../../assets/assets_frontend/group_profiles.png";
import arrow from "../../assets/assets_frontend/arrow_icon.svg";

const Header = () => {
  return (
    <div className="flex flex-col h-[550px] md:h-[400px]  md:flex-row justify-between items-center  bg-[#5f6fff] px-6 md:px-16  md:pt-10 rounded-lg shadow-lg">
      {/* --- Left Side --- */}
      <div className="text-left">
        <p className="text-2xl md:text-4xl font-bold text-white mb-5 leading-snug">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:justify-start mt-2 mb-5">
          <img  src={groupImg} alt="Group" />
          <p className="text-white text-sm md:text-[16px]">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>
       
          <a href="#speciality" className= " flex items-center gap-2 cursor-pointer w-60 h-14 bg-white text-gray-600 font-semibold px-6 py-2  rounded-full shadow-lg transition-transform transform hover:scale-105">
            Book appointment <img className="w-5 h-5 " src={arrow} alt="Arrow Icon" />
          </a>
          
      </div>
      {/* ---- Right Side ---- */}
      <div className=" mb-0 md:mb-1" >
        <img className="" src={headerimg} alt="Header" />
      </div>
    </div>
  );
};

export default Header;
