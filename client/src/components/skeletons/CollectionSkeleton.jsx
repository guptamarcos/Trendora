import { ProductCardSkeleton } from "./Index.jsx";

function CollectionSkeleton() {
  return (
    <main className="min-h-screen animate-pulse mt-8 sm:mt-10 px-4 sm:px-6 lg:px-[7.5vw]">
      <section className="mb-16 sm:mb-24 lg:mb-40 flex gap-6 lg:gap-8">
        <div className="flex-1">
          <div className="flex justify-between py-4 sm:py-6"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {new Array(16).fill(null).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CollectionSkeleton;