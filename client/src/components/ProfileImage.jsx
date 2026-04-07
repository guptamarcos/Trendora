import { useState, useEffect } from "react";
import { uploadProfileImage } from "../api/authApi.js";
import { defaultProfileImage } from "../assets/Index.jsx";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

function ProfileImage() {
  
  const { getUser , user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  
  useEffect(()=>{
    if(user.profileImage !== ""){
      setProfileImage(user.profileImage);
    }
  },[user])

  async function handleChange(e){
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try{
      const res = await uploadProfileImage(formData);
      console.log(res);
      getUser();
      toast.success("Image uploaded successfully");
    }catch(err){
      const message = err?.response?.data?.message ; 
      toast.error(message);
    }
  }

  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Profile Photo</h2>
      
      <label htmlFor="profileImage" className="cursor-pointer">
        <img src={`${user.profileImage}`|| {profileImage} } alt="profile"
        className="h-40 w-40 rounded-full border border-gray-300 object-cover"/>
      </label>

      <input id="profileImage" type="file" accept="image/*" className="hidden" onChange={handleChange}></input>

    </div>
  );
}

export default ProfileImage;
