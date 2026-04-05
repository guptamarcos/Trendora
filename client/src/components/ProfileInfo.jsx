import { useContext } from "react";
import { UserContext } from "../context/Index.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileInfoSchema } from "../schemas/ProfileSchema.js";
import { updateProfileInfo } from "../api/authApi.js";
import { toast } from "react-toastify";

function ProfileInfo() {

  const { user , getUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }  } = useForm({ 
    resolver: zodResolver(ProfileInfoSchema)
  });
  
  async function handleFormData(data){
    data.email = user.email;
    try{
      await updateProfileInfo(data);
      toast.success("Profile Information updated successfully");
      getUser();
    }catch(err){
      const message = err?.response?.data?.message || "Something went Wrong";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormData)}>
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Profile Information
      </h2>

      <div className="mb-5">
        <label 
          htmlFor="username"
          className="text-base text-gray-500 tracking-wide">
          Username
        </label>
        <input
          id="username"
          type="text"
          defaultValue={user.username}
          {...register("username")}
          className="w-full text-base rounded-lg bg-gray-50 border border-gray-300 py-2 px-3 mt-2 focus:outline-none focus:border-indigo-500"
        />
        {errors.username && (<p className="text-red-500 text-sm">{errors.username.message}</p>)}
      </div>

      <div className="mb-5">
        <label 
          htmlFor="email"
          className="text-base text-gray-500 tracking-wide">Email</label>
        <input
          id="email"
          type="email"
          defaultValue={user.email}
          readOnly
          {...register("email")}
          className="w-full text-base rounded-lg bg-gray-50 border border-gray-300 py-2 px-3 mt-2 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-5">
        <label 
          htmlFor="bio"
          className="text-base text-gray-500 tracking-wide">Bio</label>
        <textarea 
          id="bio"
          defaultValue={user.bio || "Tell us about your self.... "}
          {...register("bio")}
          className="w-full h-24 resize-none text-base rounded-lg bg-gray-50 border border-gray-300 py-2 px-3 mt-2 focus:outline-none focus:border-indigo-500">
        </textarea>
        {errors.bio && (<p className="text-red-500 text-sm">{errors.bio.message}</p>)}
      </div>

      <button
        type="submit"
        className="w-50 bg-indigo-600 cursor-pointer text-white text-base tracking-wide py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Save Profile
      </button>
    </form>
  );
}

export default ProfileInfo;
