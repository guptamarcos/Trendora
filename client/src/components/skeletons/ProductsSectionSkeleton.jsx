import { ProductCardSkeleton } from "./Index.jsx";

function ProductSectionSkeleton() {
  return (
    <section className="p-12 flex flex-col items-center">
      <h2 className="font-outfit pt-8 text-3xl flex items-center"> </h2>
      <p className="pt-2 text-sm font-outfit text-gray-500"></p>
      <div className="w-full grid grid-cols-5 gap-y-8 gap-x-5 mt-6">
        <ProductCardSkeleton/>
        <ProductCardSkeleton/>
        <ProductCardSkeleton/>
        <ProductCardSkeleton/>
        <ProductCardSkeleton/>
      </div>
    </section>
  );
}

export default ProductSectionSkeleton;
