import { Product } from "../Index.jsx";
import { getRelatedProducts } from "../../api/productApi.js";
import { useState, useEffect } from "react";

function RelatedProducts({ productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);


  async function getRelatedProductsInfo() {
    try {
      const res = await getRelatedProducts(productId);
      setRelatedProducts(res?.data?.data);
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(message);
    }
  }

  useEffect(() => {
    if (productId) {
      getRelatedProductsInfo();
    }
  }, [productId]);

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold mb-10 flex items-center justify-center">
        <span className="text-3xl text-gray-600">RELATED</span>&nbsp;PRODUCTS
        <hr className="w-16 ml-3 border-t-2 border-black" />
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {relatedProducts?.length > 0 &&
          relatedProducts.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
      </div>
    </section>
  );
}

export default RelatedProducts;
