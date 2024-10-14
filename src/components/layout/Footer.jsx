import logo from "../../assets/assets_frontend/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-20 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 gap-10">
          <div className="md:w-1/3">
            <img className="w-36 md:w-44 cursor-pointer mb-4" src={logo} alt="Logo" />
            <p className="text-gray-600 text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry standard dummy text ever since the 1500s.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">COMPANY</h1>
            <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/doctors" className="text-gray-700 hover:text-blue-500">ALL DOCTORS</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-500">ABOUT</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-500">CONTACT</Link>
          </div>

          <div>
            <h1 className="text-lg font-semibold">GET IN TOUCH</h1>
            <p className="text-gray-700">+9213456789</p>
            <p className="text-gray-700">mudassarkareem916@gmail.com</p>
          </div>
        </div>

        <hr className="border-gray-300" />

        <div className="text-center py-4 text-gray-500 text-sm">
          © 2024 @ MudassarKareem.dev - All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
