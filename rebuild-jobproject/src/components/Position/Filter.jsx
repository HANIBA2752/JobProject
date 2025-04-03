import React, { useEffect, useState } from "react";

function Filter({onFilterUpdate}) {
  const [positionSort, setPositionSort] = useState("asc")
  const [trendingSort, setTrendingSort] = useState("asc")
  useEffect(() => {
    onFilterUpdate?.(positionSort, trendingSort)
  }, [positionSort, trendingSort])
  return (
    <div className="dark:bg-neutral-800 w-full md:w-[20%] bg-neutral-100 p-4 md:h-auto flex flex-col space-y-4 rounded-l-md shadow-md">
      <h2 className="dark:text-white text-neutral-800 font-semibold mb-4">Filters</h2>

      {/* Position Filter */}
      <div className="flex flex-col space-y-2">
        <h3 className="dark:text-white text-neutral-600 text-sm font-medium">Position</h3>
        <select
          name="positionFilter"
          id="positionFilter"
          className="w-full mt-1 p-2 bg-neutral-200 text-neutral-800 border border-neutral-300 rounded"
          onChange = {(e)=>setPositionSort(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Trending Filter */}
      <div className="flex flex-col space-y-2">
        <h3 className="dark:text-white text-neutral-600 text-sm font-medium">Trending</h3>
        <select
          name="trendingFilter"
          id="trendingFilter"
          className="w-full mt-1 p-2 bg-neutral-200 text-neutral-800 border border-neutral-300 rounded"
          onChange = {(e)=>setTrendingSort(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
