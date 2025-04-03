import React, { useEffect, useState } from "react";
import { prePos } from "../data/pre-pos";
import { useNavigate } from "react-router-dom";

const DataTable = ({ data }) => {
  const navigate = useNavigate(); // useNavigate hook

  const groupskill = {
    PROGRAMMING_LANG: "border-blue-200 bg-blue-100 text-blue-800",
    FRAMEWORK: "border-purple-200 bg-purple-100 text-purple-800",
    LIBRARY: "border-green-500 bg-green-100 text-green-800",
    OTHER: "border-neutral-500 bg-neutral-100 text-neutral-800",
  };

  return data.map((row, index) => {
    let trendClass = "";
    switch (row.trending) {
      case "PEAK":
        trendClass = "border-green-200 bg-green-100 text-green-800";
        break;
      case "AVERAGE":
        trendClass = "border-yellow-200 bg-yellow-100 text-yellow-800";
        break;
      case "WEAK":
        trendClass = "border-red-200 bg-red-100 text-red-800 font-light";
        break;
      default:
        trendClass = "border-neutral-200 bg-neutral-100 text-neutral-800";
    }

    return (
      <tr
        key={row.id}
        className="dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-600 hover:bg-neutral-300 text-neutral-800 transition-all duration-200"
      >
        <td className="border border-neutral-300 px-4 py-2 font-light">
          {row.position}
        </td>
        <td className="border border-neutral-300 px-4 py-2 font-light">
            <div className="flex space-x-2 text-sm">
            {row.skills.map(({ score, skills }) => (<span className={`${groupskill[skills.group] ?? groupskill.OTHER} border rounded-full px-3 py-1`}>{skills.name} ({(score ?? 0)}%)</span>))}
            </div>
        </td>
        <td className="border border-neutral-300 px-4 py-2 text-center font-light">
          <span className={`${trendClass} rounded-2xl px-4 py-1 border`}>
            {row.trending}
          </span>
        </td>
        <td className="border border-neutral-300 px-4 py-2 text-center font-light">
          <button
            className="bg-neutral-100 text-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-300 hover:text-neutral-900 border border-neutral-400 transition-all duration-200"
            onClick={() => navigate(`/position-info/${row.id}`)}
          >
            Explore
          </button>
        </td>
      </tr>
    );
  });
};

const MainTable = ({ currentPage, handlePageChange, data }) => {
  const itemsPerPage = 11;
  const totalItems = prePos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = prePos.slice(startIndex, endIndex);


  return (
    <div className="w-full p-4 pr-8 overflow-x-auto">
      <div className="flex justify-center">
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full bg-neutral-100 border border-neutral-300 border-collapse overflow-hidden">
            <thead className=" bg-neutral-200">
              <tr>
                <th
                  className="dark:bg-neutral-800 dark:text-white text-neutral-800 font-medium tracking-[5px] bg-neutral-100 py-2 px-6 text-left"
                  colSpan="5"
                >
                  Computer Engineering
                </th>
              </tr>
              <tr className="dark:bg-neutral-900 dark:text-white text-neutral-800">
                <th className="border border-neutral-300 px-4 py-2 text-left font-light">
                  Position
                </th>
                <th className="border border-neutral-300 px-4 py-2 text-left font-light">
                  Mostly Skills Requirement
                </th>
                <th className="border border-neutral-300 px-4 py-2 text-center font-light">
                  Trending
                </th>
                <th className="border border-neutral-300 px-4 py-2 text-center font-light">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <DataTable data={data} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainTable;
