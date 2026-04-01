function Profile() {
  return (
    <main className="min-h-screen w-full mb-16 py-8 flex justify-center items-center  text-black">
      <div className="w-[55%] bg-gray-50 border border-gray-200 rounded-2xl px-10 py-8 shadow-sm">
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="profile"
            className="h-35 w-35 rounded-full border border-gray-300 object-cover"
          />
          
        </div>

        {/* USERNAME */}
        <div className="mb-5">
          <label className="text-base text-gray-500 tracking-wide">
            USERNAME
          </label>
          <input
            type="text"
            value="gauri_shankar"
            readOnly
            className="w-full text-base rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 mt-2 focus:outline-none"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-base text-gray-500 tracking-wide">EMAIL</label>
          <input
            type="email"
            value="gauri@example.com"
            readOnly
            className="w-full text-base rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 mt-2 focus:outline-none"
          />
        </div>

        {/* BIO */}
        <div className="mb-5">
          <label className="text-base text-gray-500 tracking-wide">BIO</label>
          <textarea
            placeholder="Tell us about your style..."
            className="w-full h-24 resize-none text-base rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 mt-2 focus:outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="text-base text-gray-500 tracking-wide">
            OLD PASSWORD
          </label>
          <input
            type="password"
            className="w-full text-base rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 mt-2 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="text-base text-gray-500 tracking-wide">
            NEW PASSWORD
          </label>
          <input
            type="password"
            className="w-full text-base rounded-lg bg-gray-100 border border-gray-200 py-2 px-3 mt-2 focus:outline-none"
          />
        </div>

        {/* BUTTON */}
        <button className="w-full bg-black cursor-pointer text-white text-base tracking-wide py-2 rounded-lg hover:bg-gray-900 transition">
          SAVE CHANGES
        </button>
      </div>
    </main>
  );
}

export default Profile;
