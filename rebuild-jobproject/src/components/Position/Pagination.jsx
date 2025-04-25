// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center p-5">
      {Array.from({ length: totalPages + 1 }, (_, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === index
              ? "bg-neutral-700 text-white border-2 border-white/30"
              : "bg-neutral-200 text-black"
          }`}
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
