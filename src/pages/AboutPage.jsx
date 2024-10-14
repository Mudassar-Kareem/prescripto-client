import aboutImg from "../assets/assets_frontend/about_image.png";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const AboutPage = () => {
  return (
    <div>
      <Navbar/>
      <h1 className="flex py-8 justify-center items-center gap-3 text-gray-600 text-2xl">
        ABOUT <span className=" text-black font-semibold ">US</span>
      </h1>
      <div className=" flex flex-col md:flex-row   gap-4 md:gap-12">
        <div className=" w-full h-full">
          <img className="" src={aboutImg} alt="about img" />
        </div>
        <div className=" flex flex-col pr-0  md:pr-32 pt-5 gap-5">
          <p className="text-md md:text-sm text-gray-500  text-justify">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className=" text-md md:text-sm text-gray-500  text-justify">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you re booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className=" font-medium text-xl"> Our Vision</p>
          <p className=" text-md md:text-sm text-gray-500  text-justify">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="">
        <h1 className="flex py-5 gap-3 text-gray-600 text-2xl">
          WHY <span className=" text-black font-semibold ">CHOOSE US</span>
        </h1>
        <div className=" flex flex-col md:flex-row justify-between">
          <div className="  border border-gray-300 p-14 hover:bg-[#5e6eff] hover:text-white  ">
            <p className="mb-5 text-xl font-semibold  ">EFFICIENCY:</p>
            <p className=" font-light">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="  border border-gray-300 p-14 hover:bg-[#5e6eff] hover:text-white  ">
            <p className="mb-5 text-xl font-semibold  ">CONVENIENCE:</p>
            <p className=" font-light">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="  border border-gray-300 p-14 hover:bg-[#5e6eff] hover:text-white  ">
            <p className="mb-5 text-xl font-semibold  ">PERSONALIZATION:</p>
            <p className=" font-light">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutPage;
