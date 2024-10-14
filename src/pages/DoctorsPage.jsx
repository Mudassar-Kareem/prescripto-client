import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";

const DoctorsPage = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [show, setShow] = useState(false);
  const {doctors} =useSelector((state)=>state.doctor);

  const filterDoc = speciality
    ? doctors.filter((doc) => doc.specialty === speciality)
    : doctors;

  const handleCategoryClick = (category) => {
    if (speciality === category) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${category}`);
      setShow(false); 
    }
  };

  return (
    <div>
      <Navbar/>
      <p className="text-gray-600 font-medium">Browse through the doctor specialists.</p>
      <div className="flex flex-col md:flex-row gap-10 mt-8">

        <div className="md:hidden">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setShow(!show)} 
          >
            {show ? "Hide Filter" : "Show Filter"}
          </button>
        </div>
        <div className={`flex flex-col gap-2 ${show ? "" : "hidden md:block"}`}>
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spe, index) => (
            <p
              key={index}
              onClick={() => handleCategoryClick(spe)}
              className={`cursor-pointer text-gray-600 font-thin border border-[#d1d8eb] px-6 py-2 ${
                speciality === spe ? "bg-[#d1d8eb]" : ""
              }`}
            >
              {spe}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div>
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/appointment/${item._id}`) || scroll(0,0)}
                  className="border rounded-lg border-[#d1d8eb] bg-white transform transition-transform duration-300 hover:-translate-y-2"
                >
                  <img className="bg-[#e6efff] w-64" src={item.avatar?.url} alt={item.name} />
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
          ) : (
            <p>No doctors available for this specialty.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DoctorsPage;
