function Subscribe() {
  return (
    <section className="min-h-[20vh] flex flex-col justify-evenly items-center mb-20 lg:mb-35 px-4 text-center">
      <h6 className="text-xl sm:text-2xl font-semibold">
        Subscribe now & get 20% off
      </h6>

      <p className="pb-2 text-gray-500 text-sm sm:text-base max-w-xl">
        Sign up to get exclusive updates and early access to new arrivals.
      </p>

      <form className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 sm:gap-0">
        <input
          className="h-12 w-full sm:w-[20rem] lg:w-[20vw] p-2 border-2 border-gray-400"
          type="email"
          placeholder="Enter your email id"
        />

        <button className="h-12 w-full sm:w-auto bg-black px-6 text-white text-xs">
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
}

export default Subscribe;