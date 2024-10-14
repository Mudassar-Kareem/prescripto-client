import Navbar from "../components/layout/Navbar";
import { useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-hot-toast";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setDob(user.dob ? formatDate(user.dob) : "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          password,
          phoneNumber,
          dob,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("User Info updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-user-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(() => {
            toast.success("User avatar updated successfully"),
              window.location.reload();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center pb-8">
        <div className="w-full md:w-1/3">
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt="User Avatar"
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
              <div className="w-full 800px:flex block pb-2">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-1">Full Name</label>
                  <input
                    type="text"
                    className={` border p-1 rounded-[5px] !w-[95%] mb-1 800px:mb-0 outline-[#3ad132] `}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={` border p-1 rounded-[5px] !w-[95%] mb-1 800px:mb-0   outline-[#3ad132]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-2">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-1">Phone Number</label>
                  <input
                    type="number"
                    className={`border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0   outline-[#3ad132]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-2">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-1">Date of birth</label>
                  <input
                    type="date"
                    className={`border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0   outline-[#3ad132]`}
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-1">Enter your password</label>
                  <input
                    type="password"
                    className={` border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0   outline-[#3ad132]`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-2 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
