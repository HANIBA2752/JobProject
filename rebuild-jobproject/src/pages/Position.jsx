// Position.js
import React, {  useEffect, useState } from "react";
import "../components/Position/pos-box.css";
import "animate.css";
import Filter from "../components/Position/Filter.jsx";
import MainTable from "../components/Position/MainTable.jsx";
import Pagination from "@/components/Position/Pagination";
import { prePos } from "@/components/data/pre-pos";

function Position() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 13;

  const totalItems = prePos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  async function loadJobs(sortPos = "asc", sortTrending = "asc", groupOfPos = []) {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs?sortPos=${sortPos}&sortTrending=${sortTrending}&groupOfPos=${groupOfPos}`);
    const js = await resp.json();
    // Reset data
    const result = []
    for (const data of js) {
      const transformed = {
        id: data.id,
        position: data.position.name,
        trending: data.trending.name,
        skills: data.job_skills ?? []
      };
      result.push(transformed)
    }
    setData(result)
    // console.log(data, result)
  }
  useEffect(() => {
    return () => {
      void loadJobs();
    };
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-[url('../src/assets/backgroundMain2.jpg')] flex justify-center">
        <div className="w-[90%] h-auto dark:bg-neutral-700 bg-neutral-100 flex flex-col md:flex-row mt-[70px] mb-[20px] md:mt-[80px] md:mb-[60px] rounded-xl">
          {/* Sidebar Filter */}
          <Filter onFilterUpdate={(p,t,gid)=> loadJobs(p,t,gid)} />
          {/* Main Table Section */}
          <div className="flex flex-col w-full">
            <MainTable
              data={data}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Position;
