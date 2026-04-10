import { useState, useEffect } from "react";
import { getAllProductInfo } from "../api/productApi.js";
import { deleteProduct } from "../api/productApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function TableHead() {
  return (
    <thead className="bg-gray-50 text-gray-600 text-sm">
      <tr>
        <th className="px-4 py-3 text-lg font-semibold">Product</th>
        <th className="px-4 py-3 text-lg font-semibold">Price</th>
        <th className="px-4 py-3 text-lg font-semibold">Stock</th>
        <th className="px-4 py-3 text-lg font-semibold">Category</th>
        <th className="px-4 py-3 text-center text-lg font-semibold">Action</th>
      </tr>
    </thead>
  );
}

function TableRow({ product , productInfo}) {
  
  const navigate = useNavigate();
  async function DeleteProduct(){
    try{
      await deleteProduct(product._id);
      toast.success("Product is deleted successfully");
      productInfo();
    }catch(err){
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      {/* PRODUCT */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={product.productImage.url} className="w-10 h-10 bg-gray-200 rounded-md flex-shrink"></img>
          <span className="font-medium text-gray-800">{product.name}</span>
        </div>
      </td>

      {/* PRICE */}
      <td className="px-4 py-3">₹{product.price}</td>

      {/* STOCK */}
      <td className="px-4 py-3">{product.stock}</td>
      
      {/* CATEGORY */}
      <td className="px-4 py-3">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>

      {/* ACTION */}
      <td className="px-4 py-3 text-center">
        <button onClick={DeleteProduct} className="cursor-pointer text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition">
          Delete
        </button>
        <button onClick={()=> navigate(`/trendora/admin/${product._id}/edit`)} className="cursor-pointer text-sm px-3 py-1 border ml-2 border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition">
          Edit
        </button>
      </td>
    </tr>
  );
}

function AdminProductInfo() {
  const [products, setProducts] = useState([]);

  async function productInfo(){
    let res = await getAllProductInfo();
    setProducts(res?.data?.data);
  }
  useEffect(()=>{
    productInfo();
  },[])

  return (
    <main className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Products
          </h1>
          <p className="text-gray-500 text-base">
            Manage and monitor all products
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search users..."
              className="h-11 w-full md:w-72 border border-gray-200 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
            <button className="h-11 px-6 rounded-md border border-gray-200 text-gray-700 bg-white hover:bg-gray-100 transition">
              Search
            </button>
          </div>

          <select className="h-11 border border-gray-200 px-4 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-black">
            <option>All Categories</option>
            <option>Men</option>
            <option>Women</option>
            <option>Boys</option>
            <option>Girls</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <TableHead />

            <tbody className="text-gray-700">

              {products?.map((product,index)=>{
                return <TableRow key={index} product={product} productInfo={productInfo}/>
              })}
              
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            Showing{" "}
            <span className="font-medium text-gray-800">1–10</span> of{" "}
            <span className="font-medium text-gray-800">50</span> products
          </p>

          <button className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition">
            Show more
          </button>
        </div>

      </div>
    </main>
  );
}

export default AdminProductInfo;