import { useContext } from "react";
import { uploadProfileImage } from "../api/authApi.js";
import { defaultProfileImage } from "../assets/Index.jsx";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.jsx";

function ProfileImage() {
  const { getUser, user } = useContext(UserContext);

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await uploadProfileImage(formData);
      console.log(res);
      getUser();
      toast.success("Image uploaded successfully");
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(message || "Upload failed");
    }
  }

  return (
    <div className="flex flex-col items-center mb-10">
      
      <label htmlFor="profileImage" className="cursor-pointer">
        <img
          src={user?.profileImage?.path || defaultProfileImage}
          alt="profile"
          className="h-50 w-50 rounded-full border border-gray-300 object-cover"
        />
      </label>

      <input
        id="profileImage"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

export default ProfileImage;