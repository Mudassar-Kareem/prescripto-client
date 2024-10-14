import contactImg from "../assets/assets_frontend/contact_image.png";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const ContacPaget = () => {
  return (
    <div>
      <Navbar/>
      <h1 className="flex py-8 justify-center items-center gap-3 text-gray-600 text-2xl">
        CONTACT <span className=" text-black font-semibold ">US</span>
      </h1>
      <div className=" flex items-center justify-center flex-col md:flex-row gap-10">
        <img src={contactImg} alt="" className=" w-[400px] h-[400px]" />
        <div className="flex flex-col gap-5">
          <p className=" text-xl font-semibold">OUR OFFICE</p>
          <p className=" text-[15px] text-gray-600">00000 Willms Station Suite 000, Washington, USA</p>
          <div className="">
          <p className="text-[15px] text-gray-600">Tel: (000) 000-0000</p>
          <p className="text-[15px] text-gray-600">Email: mudassarkareem916@gmail.com</p>
          </div>
          
          <p className="text-xl font-semibold">CAREERS AT PRESCRIPTO</p>
          <p className="text-[15px] text-gray-600">Learn more about our teams and job openings.</p>
          <p className="border border-black w-1/2 py-3 px-3 text-center cursor-pointer font-medium hover:bg-black hover:text-white ">Explore Jobs</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContacPaget;
