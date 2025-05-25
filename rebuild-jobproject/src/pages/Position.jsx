// Position.js
import React, { useEffect, useState } from "react";
import "../components/Position/pos-box.css";
import "animate.css";
import Filter from "../components/Position/Filter.jsx";
import MainTable from "../components/Position/MainTable.jsx";
import Pagination from "@/components/Position/Pagination";
import { prePos } from "@/components/data/pre-pos";

function Position() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    is_updated: false,
    positionSort: "asc",
    trendingSort: "desc",
    positionGroupIds: [],
    searchQuery: "",
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  // Select program language
  const [selectedProgramLanguage, setSelectedProgramLanguage] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };
  async function loadJobs() {
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/api/jobs?${new URLSearchParams({
        sortPos: filter.positionSort,
        sortTrending: filter.trendingSort,
        groupOfPos: filter.positionGroupIds,
        search: filter.searchQuery,
        language: selectedProgramLanguage,
        page,
      }).toString()}`
    );
    const js = await resp.json();
    setPageTotal(js.pagination.pageTotal);
    // Reset data
    const result = [];
    for (const data of js.items ?? []) {
      const transformed = {
        id: data.id,
        position: data.position.name,
        trending: data.trending.name,
        skills: data.position.job_skills ?? [],
      };
      result.push(transformed);
    }

    setData(result);
    // console.log(data, result)
  }
  useEffect(() => {
    return () => {
      void loadJobs();
    };
  }, []);

  useEffect(() => {
    if (filter.is_updated) {
      void loadJobs();
    }
  }, [filter, page]);

  useEffect(() => {
    void loadJobs();
  }, [selectedProgramLanguage]);

  return (
    <>
      <div className="w-screen h-screen bg-[url('../src/assets/backgroundMain2.jpg')] flex justify-center">
        <div className="w-[90%] h-auto dark:bg-neutral-700 bg-neutral-100 flex flex-col md:flex-row mt-[70px] mb-[20px] md:mt-[80px] md:mb-[60px] rounded-xl">
          {/* Sidebar Filter */}
          <Filter
            onFilterUpdate={(data) => {
              setFilter((p) => ({
                ...data,
                trendingSort: p.trendingSort,
                is_updated: true,
              }));
            }}
          />
          {/* Main Table Section */}
          <div className="flex flex-col w-full">
            <MainTable
              // Sort tredning function
              onTrendingSortToggle={() => {
                setFilter((p) => ({
                  ...p,
                  trendingSort: p.trendingSort === "asc" ? "desc" : "asc",
                }));
              }}
              trendingSort={filter.trendingSort}
              data={data}
              currentPage={page}
              handlePageChange={handlePageChange}
              onLanguageSelected={(val) => {
                setSelectedProgramLanguage(val);
              }}
            />
            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={pageTotal}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Position;
