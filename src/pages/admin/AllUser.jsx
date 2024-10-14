import Header from "../../components/admin/Header";
import SideBar from "../../components/admin/Sidebar";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../reduex/actions/user";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-hot-toast";

const AllUser = () => {
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await axios.delete(`${server}/user/delete-user/${id}`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message);
    });
    dispatch(allUser());
  };

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = users?.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinedAt: user.createdAt.slice(0, 10),
  })) || [];

  return (
    <div className="">
      <Header />
      <div className="flex w-full mt-10">
        <div className="w-[80px] md:w-[330px]">
          <SideBar active={4} />
        </div>
        <div className="w-full flex justify-center p-5 ">
          <div className="w-full lg:w-[95%]">
            <h3 className="text-[22px] font-Poppins pb-4 text-gray-700">All Users</h3>
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
                onClick={() => setOpen(false) || handleDelete(userId)}
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

export default AllUser;
