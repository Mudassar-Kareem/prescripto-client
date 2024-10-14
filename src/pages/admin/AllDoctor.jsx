import Header from "../../components/admin/Header";
import SideBar from "../../components/admin/Sidebar";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {  useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {  useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AllDoctor = () => {
  const { doctors } = useSelector((state) => state.doctor);
  const [open, setOpen] = useState(false);
  const [docId, setDocId] = useState("");

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/doctor/delete-doctor/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      });
    
  };

  

  const columns = [
    { field: "id", headerName: "Doc Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "experience",
      headerName: "Experience",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "specialty",
      headerName: "Specialty",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0,
    },

    {
      field: "delete",
      flex: 0.6,
      minWidth: 130,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              setDocId(params.id);
              setOpen(true);
            }}
          >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
    {
      field: "preview",
      flex: 0.6,
      minWidth: 130,
      headerName: "Preview",
      type: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/appointment/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows =
    doctors?.map((doc) => ({
      id: doc._id,
      name: doc.name,
      email: doc.email,
      specialty: doc.specialty,
      experience: doc.experience,
      joinedAt: doc.createdAt.slice(0, 10),
    })) || [];

  return (
    <div className="">
      <Header />
      <div className="flex  mt-10">
        <div className="w-[80px] md:w-[330px]">
          <SideBar active={3} />
        </div>
        <div className="w-full flex  p-5 ">
          <div className="w-full lg:w-[90%]">
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
      </div>

      {/* Delete Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-[90%] md:w-[40%] p-5 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            >
              <RxCross1 size={25} />
            </button>
            <h3 className="text-center text-[22px] font-semibold text-gray-800 py-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex items-center justify-center gap-4">
              <button
                className="bg-gray-700 text-white px-6 py-2 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
                onClick={() => setOpen(false) || handleDelete(docId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctor;
