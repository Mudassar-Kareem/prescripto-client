import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import AboutPage from "./pages/AboutPage";
import ContacPaget from "./pages/ContacPaget";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Appointment from "./pages/Appointment";
import { Toaster } from "react-hot-toast";
import Store from "./reduex/store";
import { useEffect, useState } from "react";
import { loadUser } from "./reduex/actions/user";
import ProfilePage from "./pages/ProfilePage";
import MyAppointment from "./pages/MyAppointment";
import DoctorLoginPage from "./pages/doctor/DoctorLoginPage";
import DoctorSignupPage from "./pages/doctor/DoctorSignupPage";
import { getAllDoctor, loadDoctor } from "./reduex/actions/doctor";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointment from "./pages/admin/AllAppointment";
import AllDoctor from "./pages/admin/AllDoctor";
import AllUser from "./pages/admin/AllUser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "./server";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  console.log(stripeApikey);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadDoctor());
    Store.dispatch(getAllDoctor());
    getStripeApikey();
  }, []);
  return (
    <div className="mx-4 sm:mx-[10%]">
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route path="/my-appointment" element={<MyAppointment />} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:speciality" element={<DoctorsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContacPaget />} />
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* doctors routes */}
        <Route path="/doctor-login" element={<DoctorLoginPage />} />
        <Route path="/doctor-signup" element={<DoctorSignupPage />} />
        <Route path="/doc-profile" element={<DoctorProfilePage />} />

        {/* Admin routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-appointments" element={<AllAppointment />} />
        <Route path="/doctor-list" element={<AllDoctor />} />
        <Route path="/all-user" element={<AllUser />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
