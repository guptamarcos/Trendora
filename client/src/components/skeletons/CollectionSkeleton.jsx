import { ProductCardSkeleton } from "./Index.jsx";

function CollectionSkeleton() {

  return (
    <main className="mt-10 px-[7.5vw] animate-pulse">
      <section className="mb-40 min-h-screen flex gap-8">
       
        <div className="flex-1">
          <div className="py-6 flex justify-between "> </div>

          <div className="grid grid-cols-4 gap-6">
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CollectionSkeleton;
