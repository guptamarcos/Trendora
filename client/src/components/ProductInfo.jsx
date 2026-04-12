import { CommentCard, ProductDetails } from "./Index.jsx";

function ProductInfo() {
  return (
    <main className="min-h-screen mb-30">
      <ProductDetails />

      <section className=" mt-5 mb-20">
        <h4 className="text-3xl font-semibold mb-8 flex items-center justify-center">
          <hr className="w-[5%] border-t-2 border-black" />
          &nbsp; PRODUCT
          <span className="text-3xl text-gray-600">
            &nbsp;REVIEWS&nbsp;
          </span>
        </h4>

        <div className="grid grid-cols-3 gap-4">
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </section>
    </main>
  );
}

export default ProductInfo;
