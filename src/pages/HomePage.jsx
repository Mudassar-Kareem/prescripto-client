import Banner from "../components/layout/Banner"
import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"
import Navbar from "../components/layout/Navbar"
import Speciality from "../components/layout/speciality"
import TopDoctor from "../components/layout/TopDoctor"



const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Speciality/>
      <TopDoctor/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default HomePage