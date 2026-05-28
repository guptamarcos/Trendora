import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaBox, FaSignOutAlt } from "react-icons/fa";
import { useContext, useRef, useEffect, useState } from "react";
import { logoutUser } from "../api/authApi.js";
import { UserContext } from "../context/Index.jsx";
import { toast } from "react-toastify";
import Loader from "./loaders/Loader.jsx";

function UserDropDown({ isOpen, setIsOpen, buttonRef }) {
  const dropDownRef = useRef(null);
  const { user, getUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      const res = await logoutUser();
      getUser();
      toast.success("You have been logged out successfully");
      navigate("/trendora");
      setIsOpen(false);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally{
      setLoading(false);
    }
  }

  
  useEffect(() => {
    
    function closeDropdown(evt) {
      
      if(buttonRef?.current?.contains(evt.target)){
        return;
      }
      
      if(!dropDownRef?.current?.contains(evt.target)){
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", closeDropdown);
    
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);
  
  // console.log(ref.current);
  
  if(loading){
    return <Loader/>
  }

  return (
    <div
      className={`absolute right-2 top-14 w-56 p-4 flex flex-col bg-white rounded-xl border border-gray-200 shadow-lg z-50 ${isOpen ? "" : "hidden"}`}
      ref={dropDownRef}
    >
      {/* User Info */}
      <div className="border-b pb-3 mb-3">
        <p className="font-semibold text-gray-800">
          {user?.username || "Not available"}
        </p>
        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
      </div>

      {/* Links */}
      <NavLink
        to="/trendora/profile"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-md text-base transition ${
            isActive
              ? "bg-gray-100 text-black"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }`
        }
      >
        <FaUser />
        Profile
      </NavLink>

      <NavLink
        to="/trendora/orders"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-md text-base transition ${
            isActive
              ? "bg-gray-100 text-black"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }`
        }
      >
        <FaBox />
        My Orders
      </NavLink>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-md text-base text-red-500 hover:bg-red-100 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default UserDropDown;
