import { ProfileImage, ProfileInfo, ProfileSecurity } from "./Index.jsx"; 

function Profile() {

  return (
    <main className="min-h-screen w-full mb-16 py-8 flex justify-center items-center text-gray-800">
      <div className="w-[55%] bg-white border border-gray-200 rounded-2xl px-10 py-8 shadow-md">
        
        {/* PROFILE IMAGE */}
        <ProfileImage/>
         
        {/* PROFILE INFO */}
        <ProfileInfo/>
        
        {/* PASSWORD */}
        <ProfileSecurity/>

      </div>
    </main>
  );
}

export default Profile;