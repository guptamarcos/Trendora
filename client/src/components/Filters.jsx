function Filters() {
  return (
    <aside className="w-[17.5%] pt-12">
      <h2 className="text-2xl text-gray-700">FILTERS</h2>
      <div className="border-2 border-gray-400 p-4 my-4">

        <h4 className="text-lg font-semibold pb-2">CATEGORIES</h4>

        <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="Categories">
            <input type="checkbox" value="Men" id="Categories" className="mr-2 text-base"></input>
            Men
          </label>
        </div>

        <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="Categories">
            <input type="checkbox" value="Women" id="Categories" className="mr-2 text-base"></input>
            Women
          </label>
        </div>

        <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="Categories">
            <input type="checkbox" value="Kids" id="Categories" className="mr-2 text-base"></input>
            Girl
          </label>
        </div>

         <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="Categories">
            <input type="checkbox" value="Kids" id="Categories" className="mr-2 text-base"></input>
            Boys
          </label>
        </div>

      </div>

    </aside>
  );
}

export default Filters;
