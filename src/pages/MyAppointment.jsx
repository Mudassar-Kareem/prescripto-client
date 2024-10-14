import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PaymentForm from "../components/card/PaymentForm";
import { server } from "../server";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedAppointmentAmount, setSelectedAppointmentAmount] =useState(null);

  const userId = user?._id;

  const cancelHandle = async (appointmentId) => {
    try {
      const res = await axios.post(
        `${server}/appointment/cancel-appointment`,
        { userId, appointmentId },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (err) {
      toast.error(err.response?.data.message || "Error cancelling appointment");
    }
  };

  const getUserAppointment = async () => {
    try {
      const res = await axios.get(
        `${server}/appointment/appointment/${userId}`,
        { withCredentials: true }
      );
      setAppointments(res.data.appointments.reverse());
    } catch (err) {
      toast.error(err.response?.data.message || "Error fetching appointments");
    }
  };

  const handlePayNowClick = (appointmentId, amount) => {
    setSelectedAppointmentId(appointmentId);
    setSelectedAppointmentAmount(amount);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setSelectedAppointmentId(null);
    setSelectedAppointmentAmount(null);
    toast.success("Payment successful!");
    getUserAppointment(); // Refresh appointments after successful payment
  };

  useEffect(() => {
    if (userId) {
      getUserAppointment();
    }
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className="">
        <p className="text-gray-500 text-xl font-semibold">My appointments</p>
        <div className="flex flex-col gap-3 mt-5">
          {appointments.map((item) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-t border-b border-gray-100"
              key={item._id}
            >
              <div>
                <img
                  className="w-40 bg-[#e9efff]"
                  src={item.docData?.avatar?.url}
                  alt=""
                />
              </div>
              <div className="flex-1 mt-5">
                <p className="font-bold">{item.docData?.name}</p>
                <p className="text-[14px] text-gray-700">
                  {item.docData?.specialty}
                </p>
                <p className="font-semibold">Address:</p>
                <p className="text-[14px] text-gray-700">
                  {item.docData?.address}
                </p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {item.slotDate} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {item.canceled ? (
                  <button className="text-sm text-red-500 border border-red-500 text-center sm:min-w-48 py-2 ">
                    Appointment cancelled
                  </button>
                ) : (
                  <>
                    {!item.canceled && item.payment === false && (
                      <button
                        onClick={() => handlePayNowClick(item._id, item.amount)}
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
                      >
                        Pay Now
                      </button>
                    )}
                    {item.payment === true && item.isComplete === false &&(
                      <button className="text-sm text-center sm:min-w-48 py-2 border text-green-600 border-green-600 transition-all duration-300 ease-in-out">
                        Paid
                      </button>
                    )}
                     {item.payment === true && item.isComplete === true && (
                      <button className="text-sm text-center sm:min-w-48 py-2 border text-green-600 border-green-600 transition-all duration-300 ease-in-out">
                        Completed
                      </button>
                    )}
                    {!item.payment === true && (
                      <button
                        onClick={() => cancelHandle(item._id)}
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                      >
                        Cancel appointment
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {showPaymentForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <PaymentForm
                appointmentId={selectedAppointmentId}
                amount={selectedAppointmentAmount}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentForm(false)}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAppointment;
