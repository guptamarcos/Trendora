import { ProductSectionSkeleton } from "./Index.jsx";

function HomeSkeleton() {
  return (
    <main className="mt-20 px-[7.5vw] animate-pulse">
      
      <section className="flex border-2 rounded-lg border-gray-300 min-h-[400px]">
        
        <div className="w-[50%] flex flex-col justify-center items-center px-6">
          <div className="w-full max-w-md space-y-6">
           
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>

            
            <div className="space-y-3">
              <div className="h-12 w-72 bg-gray-300 rounded"></div>
              <div className="h-12 w-56 bg-gray-300 rounded"></div>
            </div>

            
            <div className="flex items-center gap-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-[2px] w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Right Image Skeleton */}
        <div className="w-[50%] flex items-center justify-center p-6">
          <div className="w-full h-[350px] bg-gray-300 rounded-lg"></div>
        </div>
      </section>

     
      <ProductSectionSkeleton/>
    </main>
  );
}

export default HomeSkeleton;