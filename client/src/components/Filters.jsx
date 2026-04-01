function Filters() {
  return (
    <aside className="w-[20%] pt-12">
      <h2 className="text-xl text-gray-700">FILTERS</h2>
      <div className="border-2 border-gray-400 p-4 my-4">

        <h4 className="text-base pb-2">CATEGORIES</h4>

        <div className="flex items-center">
          <input type="checkbox" value="Men" id="Categories"></input>
          <label className="pl-2 cursor-pointer" id="Categories">Men</label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" value="Women" id="Categories"></input>
          <label className="pl-2 cursor-pointer" id="Categories">Women</label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" value="Kids" id="Categories"></input>
          <label className="pl-2 cursor-pointer" id="Categories">Kids</label>
        </div>

      </div>

      <div className="border-2 border-gray-400 p-4">

        <h4 className="text-base pb-2">TYPE</h4>
        
        <div className="flex items-center">
           <input type="checkbox" value="TopWear" id="Type"></input>
           <label className="pl-2 cursor-pointer" id="Type">TopWear</label>
        </div>

        <div className="flex items-center">
           <input type="checkbox" value="BottomWear" id="Type"></input>
           <label className="pl-2 cursor-pointer" id="Type">BottomWear</label>
        </div>

        <div className="flex items-center">
           <input type="checkbox" value="WinterWear" id="Type"></input>
           <label className="pl-2 cursor-pointer" id="Type">WinterWear</label>
        </div>

      </div>
    </aside>
  );
}

export default Filters;
