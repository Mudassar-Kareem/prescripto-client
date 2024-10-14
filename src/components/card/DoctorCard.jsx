import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorCard = () => {
  const { doctors } = useSelector((state) => state.doctor);
  const navigate = useNavigate();

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {doctors.slice(0, 8).map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(`/appointment/${item._id}`) || scroll(0, 0)}
          className="border rounded-lg border-[#d1d8eb] bg-white transform transition-transform duration-300 hover:-translate-y-2"
        >
          <img className="bg-[#e6efff] w-64" src={item.avatar?.url} alt="" />
          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-green-500 text-[14px] font-semibold">Available</p>
            </div>
            <p className="text-[19px] font-semibold">{item.name}</p>
            <p className="text-[14px] font-semibold text-gray-500">{item.specialty}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCard;
