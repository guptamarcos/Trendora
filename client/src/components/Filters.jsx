function Filters({activeFilter,setActiveFilter}) {

  function handleChange(evt){
    const currSelectedCategory = evt.target.value;
    const isActive = activeFilter[currSelectedCategory];
    setActiveFilter((prev)=>{
      return Object.keys(prev).reduce((acc,key)=>{
        if(key === currSelectedCategory) acc[key] = !prev[key];
        else acc[key] = prev[key];
        return acc;
      },{});
    })
  }
 
  return (
    <aside className="w-[17.5%] pt-12">
      <h2 className="text-2xl text-gray-700">FILTERS</h2>
      <div className="border-2 border-gray-400 p-4 my-4">

        <h4 className="text-lg font-semibold pb-2">CATEGORIES</h4>

        <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="men">
            <input type="checkbox" value="men" id="men" className="mr-2 text-base" onChange={handleChange}></input>
            Men
          </label>
        </div>

        <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="women">
            <input type="checkbox" value="women" id="women" className="mr-2 text-base" onChange={handleChange}></input>
            Women
          </label>
        </div>

        <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="girl">
            <input type="checkbox" value="girl" id="girl" className="mr-2 text-base" onChange={handleChange}></input>
            Girl
          </label>
        </div>

         <div className="flex items-center">
          <label className="pl-2 cursor-pointer" id="boy">
            <input type="checkbox" value="boy" id="boy" className="mr-2 text-base" onChange={handleChange}></input>
            Boys
          </label>
        </div>

      </div>

    </aside>
  );
}

export default Filters;
