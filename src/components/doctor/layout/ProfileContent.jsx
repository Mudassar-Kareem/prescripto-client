import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { server } from "../../../server";
import toast from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { GiConfirmed } from "react-icons/gi";

const ProfileContent = ({ active }) => {
  const { doctor } = useSelector((state) => state.doctor);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fees, setFees] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [appointment, setAppointment] = useState([]);

  const docId = doctor?._id;

  const getDocAppointment = async () => {
    await axios
      .get(`${server}/appointment/doc-appointment/${docId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setAppointment(res.data.appointments);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const confirmSlot = async(appointmentId) =>{
    axios.put(`${server}/appointment/confirm/${appointmentId}`,{docId},{withCredentials:true}).then((res)=>{
      toast.success(res.data.message)
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }
  
  useEffect(()=>{
   if(docId){
    getDocAppointment()
   }
  },[docId])

  // Update state when doctor data changes
  useEffect(() => {
    if (doctor) {
      setName(doctor.name || "");
      setEmail(doctor.email || "");
      setFees(doctor.fees || "");
      setDegree(doctor.degree || "");
      setExperience(doctor.experience || "");
      setAddress(doctor.address || "");
      setAbout(doctor.about || "");
    }
  }, [doctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}/doctor/update-doc-info`,
        { name, email, password, fees, degree, experience, address, about },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Doctor info updated successfully");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/doctor/update-doc-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(() => {
            toast.success("Doctor avatar updated successfully");
            window.location.reload();
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  
  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "patient",
      headerName: "Patient Name",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 90,
      flex: 0.6,
      renderCell: (params) => (
        <span style={{ color: params.value === "Canceled" ? "red" : "green" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "payment",
      headerName: "Payment",
      minWidth: 90,
      flex: 0.6,
      renderCell: (params) => (
        <span style={{ color: params.value === "Unpaid" ? "red" : "green" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "date",
      headerName: "Date & Time",
      minWidth: 170,
      flex: 0.6,
    },
    {
      field: "",
      flex: 0.6,
      minWidth: 130,
      headerName: "Action",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
             confirmSlot(params.id)
            }}
          >
            <span style={{color :"green"}}><GiConfirmed size={20} /></span>
          </Button>
        );
      },
    },
    
  ];

  const rows =
    appointment?.map((app) => ({
      id: app._id,
      patient: app.userData.name,
      amount: app.amount,
      date: `${app.slotDate} ${app.slotTime}`,
      status: `${app.canceled === true ? "Canceled" : "Confirm"}`,
      payment: `${app.payment === true ? "Paid": "Unpaid"}`
      
    })) || [];

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={avatar ? avatar : `${doctor?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row w-full gap-2">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className="w-full border p-1 rounded-[5px] mb-1 800px:mb-0"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-2">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Specialty</label>
                  <input
                    type="text"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={doctor && doctor?.specialty}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-2">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Fees</label>
                  <input
                    type="number"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Degree</label>
                  <input
                    type="text"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-2">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Experience</label>
                  <input
                    type="text"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address</label>
                  <input
                    type="text"
                    className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-[100%] 800px:w-[50%]">
                <label className="block pb-2">About</label>
                <textarea
                  type="text"
                  className="w-full border p-1 rounded-[5px] mb-4 800px:mb-0"
                  required
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <input
                className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && (
         <div className="w-full flex  p-5 ">
         <div className="w-full lg:w-[100%]">
           <h3 className="text-[22px] font-Poppins pb-4 text-gray-700">
             All Doctors
           </h3>
           <div className="w-full min-h-[45vh] bg-white rounded-lg shadow-lg p-4">
             <DataGrid
               rows={rows}
               columns={columns}
               pageSize={10}
               disableSelectionOnClick
               autoHeight
               className="!text-gray-700"
             />
           </div>
         </div>
         
       </div>
       
      )}
    </div>
  );
};

export default ProfileContent;
