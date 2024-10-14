import { useEffect } from "react";
import Header from "../../components/admin/Header";
import SideBar from "../../components/admin/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointment } from "../../reduex/actions/appointment";

const AllAppointment = () => {
  const { appointment } = useSelector((state) => state.appointment);
  const dispatch = useDispatch()
  
  useEffect(()=>{
   dispatch(getAllAppointment())
  },[dispatch])

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
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
      flex: 0,
    },
  ];

  const rows =
    appointment?.map((app) => ({
      id: app._id,
      patient: app.userData.name,
      doctor: app.docData.name,
      amount: app.amount,
      date: `${app.slotDate} ${app.slotTime}`,
      createdAt: app.createdAt.slice(0, 10),
    })) || [];

  return (
    <div className="">
      <Header />
      <div className="flex w-full mt-10">
        <div className="w-[80px] md:w-[330px]">
          <SideBar active={2} />
        </div>
        <div className="w-full flex justify-center p-5 ">
          <div className="w-full lg:w-[95%]">
            <h3 className="text-[22px] font-Poppins pb-4 text-gray-700">
              All Appointments
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
      </div>
    </div>
  );
};

export default AllAppointment;
