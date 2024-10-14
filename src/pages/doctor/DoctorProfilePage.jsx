import { useState } from "react"
import Navbar from "../../components/doctor/layout/Navbar"
import ProfileSidebar from "../../components/doctor/layout/ProfileSidebar";
import ProfileContent from "../../components/doctor/layout/ProfileContent";


const DoctorProfilePage = () => {
    const [active,setActive] =useState(1);
  return (
    <div>
        <Navbar/>
       <div className="py-10">
       <div className=" flex bg-gray-200 py-4 px-2 ">
            <div>
                <ProfileSidebar active={active} setActive = {setActive}/>
            </div>
            <ProfileContent active={active}/>
        </div>
       </div>
    </div>
  )
}

export default DoctorProfilePage