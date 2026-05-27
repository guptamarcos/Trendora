import { ProductCardSkeleton } from "./Index.jsx";

function CollectionSkeleton() {
  return (
    <main className="mt-10 px-[7.5vw] min-h-screen animate-pulse">
      <section className="mb-40  flex gap-8">
        <div className="flex-1">
          <div className="py-6 flex justify-between "> </div>

          <div className="grid grid-cols-4 gap-6">
            {new Array(16).fill(null).map((_, idx) => {
              return <ProductCardSkeleton key={idx} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CollectionSkeleton;
