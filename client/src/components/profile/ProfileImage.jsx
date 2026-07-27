import { useContext } from "react";
import { uploadProfileImage } from "../../api/userApi.js";
import { defaultProfileImage } from "../../assets/Index.jsx";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext.jsx";
import ImageSchema from "../../schemas/ImageSchema.js";

function ProfileImage({ loading, setLoading }) {
  const { getUser, user } = useContext(UserContext);

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const result = ImageSchema.safeParse(file);

    if (!result.success) {
      toast.error(JSON.parse(result?.error?.message)[0]?.message);
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setLoading(true);
      const res = await uploadProfileImage(formData);
      getUser();
      toast.success("Image uploaded successfully");
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center mb-10">
      <label htmlFor="profileImage" className="cursor-pointer">
        <img
          src={user?.profileImage?.path || defaultProfileImage}
          alt="profile"
          className="h-32 w-32 sm:h-40 sm:w-40 lg:h-50 lg:w-50 rounded-full border border-gray-300 object-cover"
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
