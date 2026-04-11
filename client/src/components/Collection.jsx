import {Filters,Product} from "./Index.jsx";
import { useState, useEffect } from "react";
import {toast } from "react-toastify";
import { getAllProductInfo } from "../api/productApi.js";

function Collection() {
  const[allProducts, setAllProducts] = useState(null);

  async function getProductInfo(){
    try{
      const res = await getAllProductInfo();
      setAllProducts(res?.data?.data);
    }catch(err){
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  useEffect(()=>{
    getProductInfo();
  }, [])

  return (
    <section className="mb-40 min-h-screen flex gap-8">
      <Filters/>
      <div className="flex-1">
        <div className="py-6 flex justify-between">
          <h2 className="text-3xl flex items-center">
            ALL&nbsp;<b>COLLECTIONS</b>&nbsp;&nbsp;
            <hr className="w-[5vw] border-t-2 border-black" />
          </h2>
          <div>
             
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {allProducts?.map((product)=>{
            return <Product product={product} key={product._id} />
          })}
          
        </div>
      </div>
    </section>
  );
}

export default Collection;
