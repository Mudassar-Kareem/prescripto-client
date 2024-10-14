import { specialityData } from "../../assets/assets_frontend/assets";
import {Link} from "react-router-dom"

const Speciality = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-7 py-16"
      id="speciality"
    >
      <h1 className="text-4xl font-semibold">Find by Speciality</h1>
      <p className="text-center sm:w-1/3 text-gray-500">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData &&
          specialityData.map((item, index) => (
            <Link onClick={()=>scrollTo(0,0)} to={`/doctors/${item.speciality}`} key={index}
              className="flex flex-col items-center cursor-pointer flex-shrink-0 transform transition-transform duration-300 hover:-translate-y-2"
            >
              <img
                className="w-16 md:w-24 mb-2  "
                src={item.image}
                alt={item.speciality}
              />
              <p className="text-gray-500 text-[13px]">{item.speciality}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Speciality;
