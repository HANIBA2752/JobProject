// Position.js
import React, {  useState } from "react";
import "../components/Position/pos-box.css";
import "animate.css";
import Filter from "../components/Position/Filter.jsx";
import MainTable from "../components/Position/MainTable.jsx";
import Pagination from "@/components/Position/Pagination";
import { prePos } from "@/components/data/pre-pos";

function Position() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const totalItems = prePos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="w-screen h-screen bg-[url('../src/assets/backgroundMain2.jpg')] flex justify-center">
        <div className="w-[90%] h-auto dark:bg-neutral-700 bg-neutral-100 flex flex-col md:flex-row mt-[130px] md:mt-[50px] md:mb-[60px] rounded-xl">
          {/* Sidebar Filter */}
          <Filter />
          {/* Main Table Section */}
          <div className="flex flex-col w-full">
            <MainTable
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
