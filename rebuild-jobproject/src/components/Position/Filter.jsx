import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

function Filter({ onFilterUpdate }) {
  const [positiongroup, setPositionGroup] = useState([]);
  const [positionGroupIds, setPositionGroupIds] = useState([]);
  const [query, setQuery] = useState("");
  const [positionSort, setPositionSort] = useState("asc");

  async function loadPositionGroups() {
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
    <div className="bg-white dark:bg-stone-800 w-full md:w-[20%] p-4 md:h-auto flex flex-col space-y-4 rounded-l-lg shadow-sm border-r border-stone-200 dark:border-stone-700">
      <h2 className="text-stone-900 dark:text-stone-100 font-semibold mb-2 text-lg">
        Filters
      </h2>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 pr-10 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Checkbox Filter */}
      <div className="space-y-3">
        <h3 className="text-stone-700 dark:text-stone-300 text-sm font-medium mb-3">
          Position List
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {positiongroup.map((i, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={i.id}
                onChange={updatePositionGroupQuery}
                checked={positionGroupIds.includes(i.id.toString())}
                className="w-4 h-4 text-blue-600 bg-stone-100 dark:bg-stone-700 border-stone-300 dark:border-stone-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
              />
              <label
                htmlFor={i.id}
                className="text-sm text-stone-700 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {i.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
