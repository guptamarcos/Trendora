import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function ProfileImage() {
  return (
    <form className="flex flex-col items-center mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Profile Photo</h2>

      <img
        src="https://i.pravatar.cc/150?img=5"
        alt="profile"
        className="h-40 w-40 rounded-full border border-gray-300 object-cover"
      />

      <button
        type="button"
        className="mt-4 bg-indigo-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-indigo-700 transition"
      >
        Change Photo
      </button>
    </form>
  );
}

export default ProfileImage;
