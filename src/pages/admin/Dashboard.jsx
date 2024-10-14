import Header from "../../components/admin/Header";
import SideBar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";
import { MdBorderClear, MdEvent, MdPeople } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allUser } from "../../reduex/actions/user";
import { getAllAppointment } from "../../reduex/actions/appointment";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const { doctors } = useSelector((state) => state.doctor);
  const { users } = useSelector((state) => state.user);
  const { appointment } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUser());
    dispatch(getAllAppointment());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Id", minWidth: 100, flex: 0.5 },
    {
      field: "patient",
      headerName: "Patient Name",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "doctor",
      headerName: "Doctor Name",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "date",
      headerName: "Date & Time",
      minWidth: 180,
      flex: 0.6,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "text",
      minWidth: 130,
      flex: 0.5,
    },
  ];

  const rows = Array.isArray(appointment)
  ? [...appointment]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((app) => ({
        id: app._id,
        patient: app.userData.name,
        doctor: app.docData.name,
        amount: app.amount,
        date: `${app.slotDate} ${app.slotTime}`,
        createdAt: app.createdAt.slice(0, 10),
      }))
  : []; // Fallback to an empty array if appointment is not an array


  return (
    <div className=" min-h-screen">
      <Header />
      <div className="flex mt-10 ">
        <div className="flex w-full ">
          <div className=" w-[330px]">
            <SideBar active={1} />
          </div>
          <div className="w-full p-4">
            <h3 className="text-2xl font-Poppins pb-4">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "All Users",
                  count: users?.length,
                  icon: <MdPeople size={30} className="mr-2" fill="#00000085" />,
                  link: "/all-user",
                },
                {
                  title: "All Doctors",
                  count: doctors?.length,
                  icon: <MdBorderClear size={30} className="mr-2" fill="#00000085" />,
                  link: "/doctor-list",
                },
                {
                  title: "All Appointments",
                  count: appointment?.length,
                  icon: <MdEvent size={30} className="mr-2" fill="#00000085" />,
                  link: "/all-appointments",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 ">
                  <div className="flex items-center">
                    {item.icon}
                    <h3 className="font-Roboto text-[#333] text-lg">{item.title}</h3>
                  </div>
                  <h5 className="pt-2 text-2xl font-semibold">{item.count}</h5>
                  <Link to={item.link}>
                    <h5 className="pt-4 text-[#077f9c] cursor-pointer hover:underline">View {item.title}</h5>
                  </Link>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-center p-5">
              <div className="w-full lg:w-[100%]">
                <h3 className="text-2xl font-Poppins pb-4 text-gray-700">Recent Appointments</h3>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    autoHeight
                    className="!text-gray-700"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
