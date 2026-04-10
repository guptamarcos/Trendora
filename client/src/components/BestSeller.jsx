import { Product } from "./Index.jsx";
function BestSeller(){
    return (
        <section className="px-12 py-4 flex flex-col items-center">
            <h2 className="font-outfit text-3xl flex items-center">
                BEST &nbsp;<b>SELLER</b> &nbsp; &nbsp;
                <hr className="w-12 border-t-2 border-black" />
            </h2>
            <p className="pt-2 text-sm font-outfit text-gray-500">Explore our top-selling picks that customers can’t get enough of, combining trend, comfort, and value.</p>
            <div className="w-full grid grid-cols-5 gap-x-5 mt-6">
                
            </div>
        </section>
    )
}

export default BestSeller;