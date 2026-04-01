import {Filters,Shirt} from "./Index.jsx";

function Collection() {
  return (
    <section className="mb-40 min-h-screen flex gap-8">
      <Filters/>
      <div className="flex-1">
        <div className="py-6 flex justify-between">
          <h2 className="text-3xl flex items-center">
            ALL&nbsp;<b>COLLECTIONS</b>&nbsp;&nbsp;
            <hr className="w-[5vw] border-t-2 border-black" />
          </h2>
          <div>
             
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
          <Shirt/>
        </div>
      </div>
    </section>
  );
}

export default Collection;
