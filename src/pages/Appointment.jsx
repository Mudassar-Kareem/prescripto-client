import { useNavigate, useParams } from "react-router-dom";
import verified from "../assets/assets_frontend/verified_icon.svg";
import info from "../assets/assets_frontend/info_icon.svg";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";
import { server } from "../server";
import axios from "axios";
import toast from "react-hot-toast";

const Appointment = () => {
  const navigate = useNavigate();
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(""); // Initialized as an empty string
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { isAuthenticated } = useSelector((state) => state.user);
  const { doctors } = useSelector((state) => state.doctor);
  const { user, users } = useSelector((state) => state.user);
  const userId = user?._id;
  const userData = users?.find((us) => us._id === userId);
  const { id } = useParams();
  const doc = doctors?.find((doc) => doc._id === id);
  const sameDoc = doctors?.filter((doctor) => doctor.specialty === doc?.specialty && doctor._id !== id);

  const getAvailableSlot = async () => {
    setDocSlot([]);
    let today = new Date();
    const allSlot = [];
  
    for (let i = 0; i < 7; i++) {
      const currDate = new Date(today);
      currDate.setDate(today.getDate() + i);
      let endDate = new Date();
      endDate.setDate(today.getDate() + i);
      endDate.setHours(21, 0, 0, 0);
      
      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }
  
      const timeSlot = [];
      
      while (currDate < endDate) {
        const formattedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currDate.getDate();
        let month = currDate.getMonth() + 1;
        let year = currDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        
        const isBooked = !(doc.slot_booked && doc.slot_booked[slotDate] && doc.slot_booked[slotDate].includes(formattedTime));
        console.log("Slot booked data:", doc.slot_booked);
        console.log("Checking for slot date:", slotDate);
        
  
        if (isBooked) {
          timeSlot.push({
            dateTime: new Date(currDate),
            time: formattedTime,
          });
        }
       
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      allSlot.push(timeSlot);
    }
    console.log('Available slots:', allSlot); // Check the structure of allSlot
    setDocSlot(allSlot);
  };
  

  const bookAppointment = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!slotTime) { // Added check for slotTime
      toast.error("Please select a time slot.");
      return;
    } else {
      try {
        const date = docSlot[slotIndex][0].dateTime;
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

        await axios.post(
          `${server}/appointment/book-appointment`,
          {
            userId,   
            docId: id, 
            slotDate,
            slotTime,
            docData: doc,
            userData,
            amount: doc.fees,
          },
          { withCredentials: true }
        ).then(() => {
          toast.success("Appointment Booked");
          navigate("/my-appointment");
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred");
      }
    }
  };
  
  useEffect(() => {
    getAvailableSlot();
  }, [doc]);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col mt-10 md:flex-row items-stretch md:gap-8 ">
        {/* Image Container */}
        <div className="flex w-full md:w-[70%] bg-[#5f6fff] rounded-lg overflow-hidden relative">
          {doc ? (
            <img
              className="w-full object-cover h-full"
              src={doc.avatar?.url}
              alt={doc.name}
            />
          ) : (
            <p className="text-red-500">Doctor not found.</p>
          )}
        </div>

        {/* Text Container */}
        <div className="border border-gray-500 rounded-lg p-5 md:p-10 flex flex-col justify-between">
          {doc ? (
            <>
              <div className="flex gap-2 items-center">
                <h1 className="text-[22px] font-semibold">{doc.name}</h1>
                <img className="w-5" src={verified} alt="Verified" />
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-[16px] md:text-[20px] text-gray-600">
                  {doc.degree} - {doc.specialty}
                </p>
                <p className="border border-gray-300 rounded-full text-gray-500 text-sm px-1">
                  {doc.experience}
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2 mb-2">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold text-[16px] md:text-[18px]">
                    About
                  </h1>
                  <img src={info} alt="Info" />
                </div>
                <div className="text-gray-600 text-justify text-[16px]">
                  {doc.about}
                </div>
              </div>
              <p className="font-semibold text-[18px] text-gray-700">
                Appointment fee: ${doc.fees}
              </p>
            </>
          ) : (
            <p className="text-red-500">Doctor not found.</p>
          )}
        </div>
      </div>
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600">
        <p>Booking slots</p>
        <div className="flex gap-3 items-end overflow-x-scroll mt-4">
          {docSlot.length > 0 && // Changed the condition to check length
            docSlot.map((item, index) => (
              <div
                className={`text-center py-6 rounded-full min-w-16 cursor-pointer ${
                  slotIndex === index
                    ? "bg-blue-600 text-white border-none shadow-lg"
                    : "text-gray-800 border border-gray-400"
                }`}
                onClick={() => setSlotIndex(index)}
                key={index}
              >
                <p>
                  {item[0] && weekdays[item[0].dateTime.getDay()]} 
                </p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex flex-row gap-5 items-center overflow-x-scroll mt-4 ">
          {docSlot.length > 0 && // Changed the condition to check length
            docSlot[slotIndex].map((item, index) => (
              <p
                key={index}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  slotTime === item.time
                    ? "bg-blue-600 text-white border-none shadow-lg"
                    : "text-gray-800 border border-gray-400"
                }`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time.toLowerCase()} 
              </p>
            ))}
        </div>
        <button onClick={bookAppointment} className="cursor-pointer bg-blue-600 rounded-full py-2 px-8 mt-5 text-white">
          Book Appointment
        </button>
      </div>
      <div className="pt-36 pb-10">
        <div className="flex flex-col justify-center items-center mb-10">
          <p className="font-semibold text-3xl">Related Doctors</p>
          <p className="text-sm mt-3 text-gray-600 font-medium">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>
        <div className="">
          {sameDoc.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {sameDoc.map((item) => ( // Changed to use item instead of index
                <div
                  key={item._id} // Use a unique identifier as key
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="border rounded-lg border-[#d1d8eb] bg-white transform transition-transform hover:scale-105 cursor-pointer"
                >
                  <img
                    src={item.avatar?.url}
                    alt={item.name}
                    className="h-44 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    <p className="text-gray-600">{item.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointment;
