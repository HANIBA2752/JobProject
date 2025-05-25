import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

function Filter({ onFilterUpdate }) {
  // State (?)
  // { id: number; name: string; }
  const [positiongroup, setPositionGroup] = useState([]);
  const [positionGroupIds, setPositionGroupIds] = useState([]);
  const [query, setQuery] = useState([]);

  const [positionSort, setPositionSort] = useState("asc");

  async function loadPositionGroups() {
    // TODO: Fetch API path /api/query/position-group and store to state
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/api/query/position-group`
    );
    const js = await resp.json();
    setPositionGroup(js);
  }

  function updatePositionGroupQuery(e) {
    const positionId = e.target.id;
    const isChecked = e.target.checked;
    if (isChecked) {
      // Append to array
      setPositionGroupIds((p) => [...new Set([...p, positionId])]);
    } else {
      setPositionGroupIds((p) => {
        const idx = p.indexOf(positionId);
        if (idx !== -1) p.splice(idx, 1);
        return [...p];
      });
    }
  }

  function doCall() {
    onFilterUpdate?.({
      positionSort,

      positionGroupIds,
      searchQuery: query,
    });
  }

  useEffect(() => {
    void loadPositionGroups();
  }, []);

  useEffect(() => {
    doCall();
  }, [positionSort, query, positionGroupIds]);

  return (
    <div className="dark:bg-neutral-800 w-full md:w-[20%] bg-neutral-100 p-4 md:h-auto flex flex-col space-y-4 rounded-l-md shadow-md">
      <h2 className="dark:text-white text-neutral-800 font-semibold mb-2">
        Filters
      </h2>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <divdivdiv div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 pr-10 rounded-full border"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <Search size={20} />
          </button>
        </divdivdiv>
      </div>

      {/* Position Filter
      <div className="flex flex-col space-y-2">
        <h3 className="dark:text-white text-neutral-600 text-sm font-medium mb-2">
          Position
        </h3>
        <select
          name="positionFilter"
          id="positionFilter"
          className="w-full mt-1 p-2 bg-neutral-200 text-neutral-800 border border-neutral-300 rounded"
          onChange={(e) => setPositionSort(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div> */}

      {/* Checkbox Filter */}
      <h3 className="dark:text-white text-neutral-600 text-sm font-medium mb-2">
        Position List
      </h3>
      <div className="space-y-3">
        {positiongroup.map((i,index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={i.id}
              onChange={updatePositionGroupQuery}
              value={positionGroupIds.includes(i.id.toString())}
            />
            <label htmlFor={i.id} className="text-sm text-neutral-700">
              {i.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
