import { Product,CommentCard, ProductDetails } from "./Index.jsx";

function ProductInfo() {
  return (
    <main className="min-h-screen mb-30">
      <ProductDetails/>

      <section className="my-20">
        <h4 className="text-2xl font-semibold mb-8 flex items-center justify-center">
          <hr className="w-[5%] border-t-2 border-black" />
          &nbsp;
          <span className="text-gray-600">PRODUCT</span>&nbsp;REVIEWS&nbsp;
        </h4>
        
        <div className="grid grid-cols-3 gap-4">
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
        </div>
      </section>
    </main>
  );
}

export default ProductInfo;
