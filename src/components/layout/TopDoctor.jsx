import { useNavigate } from "react-router-dom";
import DoctorCard from "../card/DoctorCard";

const TopDoctor = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-7 py-16">
        <h1 className="text-4xl font-semibold">Top Doctors to Book</h1>
        <p className="text-center sm:w-1/3 text-gray-500">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <DoctorCard />
        <button
          onClick={() => navigate("/doctors")}
          className=" bg-[#d1d8eb] font-semibold w-20 py-2 text-gray-600 rounded-full shadow-lg"
        >
          more
        </button>
      </div>
    </>
  );
};

export default TopDoctor;
