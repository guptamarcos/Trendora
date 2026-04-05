import { useContext } from "react";
import { UserContext } from "../context/Index.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSecuritySchema } from "../schemas/ProfileSchema.js";
import { updateProfilePassword } from "../api/authApi.js";
import { toast } from "react-toastify";

function ProfileSecurity() {
  
  const { register , handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver( ProfileSecuritySchema )
  });
  
  const { user , getUser } = useContext(UserContext);

  async function handleFormData(data){
    try{
      const res = await updateProfilePassword(data);
      toast.success("Password updated successfully");
      getUser();
    }catch(err){
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormData)}>
      <h2 className="text-xl font-bold mb-4 mt-10 text-gray-700">Security</h2>

      <div className="mb-5">
        <label 
          htmlFor="oldPassword"
          className="text-base text-gray-500 tracking-wide">
          Old Password
        </label>
        <input
          id="oldPassword"
          type="password"
          {...register("oldPassword")}
          className="w-full text-base rounded-lg bg-gray-50 border border-gray-300 py-2 px-3 mt-2 focus:outline-none focus:border-indigo-500"
        />
        {errors.oldPassword && (<p className="text-red-500 text-sm">{errors.oldPassword.message}</p>)}
      </div>

      <div className="mb-6">
        <label 
          htmlFor="newPassword"
          className="text-base text-gray-500 tracking-wide">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          {...register("newPassword")}
          className="w-full text-base rounded-lg bg-gray-50 border border-gray-300 py-2 px-3 mt-2 focus:outline-none focus:border-indigo-500"
        />
        {errors.newPassword && (<p className="text-red-500 text-sm">{errors.newPassword.message}</p>)}
      </div>

      <button
        type="submit"
        className="w-50 bg-indigo-600 cursor-pointer text-white text-base tracking-wide py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Change Password
      </button>
    </form>
  );
}

export default ProfileSecurity;
