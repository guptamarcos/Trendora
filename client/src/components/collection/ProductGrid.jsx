import { Product } from "../Index.jsx";


function ProductGrid({showProducts}) {
  return (
    <section className="flex-1">
      <div className="py-6 flex justify-between ">
        <h2 className="text-3xl flex items-center">
          ALL&nbsp;<b>COLLECTIONS</b>&nbsp;&nbsp;
          <hr className="w-[5vw] border-t-2 border-black" />
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {showProducts?.map((product) => {
          return <Product product={product} key={product._id} />;
        })}
      </div>
    </section>
  );
}

export default ProductGrid;
