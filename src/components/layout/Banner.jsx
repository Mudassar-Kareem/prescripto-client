import bannerImg from "../../assets/assets_frontend/appointment_img.png"

const Banner = () => {
  return (
    <div className="flex flex-col h-[550px] md:h-[400px]  md:flex-row justify-between items-center  bg-[#5f6fff] px-6 md:px-16 pt-10  md:pt-10 rounded-lg shadow-lg">
      {/* --- Left Side --- */}
      <div className="text-left">
        <p className="text-2xl md:text-4xl font-bold text-white mb-5 leading-snug">
          Book Appointment  <br /> With 100% Trusted Doctors
        </p>
          <a href="/login" className= "cursor-pointer w-60 h-14 bg-white text-gray-600 font-semibold px-6 py-2  rounded-full shadow-lg transition-transform transform hover:scale-105">
            Create Account
          </a>
          
      </div>
      {/* ---- Right Side ---- */}
      <div className="" >
        <img className="w-[330px]" src={bannerImg} alt="Banner Img" />
      </div>
    </div>
  )
}

export default Banner