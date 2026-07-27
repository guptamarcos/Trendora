import {
  ProfileImage,
  ProfileInfo,
  ProfileSecurity,
} from "../components/profile/Index.jsx";
import { useState, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../context/UserContext.jsx";

function Profile() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <main className="min-h-screen w-full mb-24 py-8 flex justify-center items-center text-gray-800">
      {loading && <ClipLoader size={40} />}
      <div
        className={
          loading
            ? "hidden"
            : "w-full sm:w-[90%] md:w-[75%] lg:w-[55%] bg-white border border-gray-200 rounded-2xl px-5 sm:px-8 lg:px-10 py-8 shadow-md"
        }
      >
        {/* PROFILE IMAGE */}
        <ProfileImage loading={loading} setLoading={setLoading} />

        {/* PROFILE INFO */}
        <ProfileInfo loading={loading} setLoading={setLoading} />

        {/* PASSWORD */}
        {user.authProvider === "google" ? (
          ""
        ) : (
          <ProfileSecurity loading={loading} setLoading={setLoading} />
        )}
      </div>
    </main>
  );
}

export default Profile;
