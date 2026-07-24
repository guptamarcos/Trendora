import { ProfileImage , ProfileInfo, ProfileSecurity } from "../components/profile/Index.jsx";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function Profile() {
  const [loading, setLoading] = useState(false);
  return (
    <main className="min-h-screen w-full mb-16 py-8 flex justify-center items-center text-gray-800">
      {loading && <ClipLoader size={40} />}
      <div
        className={
          loading
            ? "hidden"
            : "w-[55%] bg-white border border-gray-200 rounded-2xl px-10 py-8 shadow-md"
        }
      >
        {/* PROFILE IMAGE */}
        <ProfileImage loading={loading} setLoading={setLoading} />

        {/* PROFILE INFO */}
        <ProfileInfo loading={loading} setLoading={setLoading} />

        {/* PASSWORD */}
        <ProfileSecurity loading={loading} setLoading={setLoading} />
      </div>
    </main>
  );
}

export default Profile;
