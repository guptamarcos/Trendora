import { Shirt } from "./Index.jsx";
function LatestCollections(){
    return (
        <section className="p-12 flex flex-col items-center">
            <h2 className="font-outfit pt-8 text-3xl flex items-center">
                LATEST &nbsp;<b>COLLECTIONS</b> &nbsp; &nbsp;
                <hr className="w-12 border-t-2 border-black" />
            </h2>
            <p className="pt-2 text-sm font-outfit text-gray-500">Explore our latest collections, inspired by current trends,crafted to bring you style, comfort, and confidence every day.</p>
            <div className="w-full grid grid-rows-2 grid-cols-5 gap-y-6 gap-x-5 mt-6">
                <Shirt/>
                <Shirt/>
                <Shirt/>
                <Shirt/>
                <Shirt/>
                <Shirt/>
                <Shirt/>
            </div>
        </section>
    )
}

export default LatestCollections;