function Subscribe(){
    return (
        <section className="h-[20vh] flex flex-col justify-evenly items-center mb-40">
            <h6 className="text-2xl font-semibold">Subscribe now & get 20% off</h6>
            <p className="pb-2 text-gray-500">Sign up to get exclusive updates and early access to new arrivals.</p>
            <form className="h-[6vh] flex items-center">
                <input className="h-full w-[20vw] p-2 border-2 border-gray-400" type="email" placeholder="Enter your email id"></input>
                <button className="h-full bg-[#000000] px-4 text-[#FFFFFF] text-xs">SUBSCRIBE</button>
            </form>
        </section>
    )
}

export default Subscribe;