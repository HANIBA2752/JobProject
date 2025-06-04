import React, { useEffect, useState } from "react";
import { prePos } from "../data/pre-pos";
import { useNavigate } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional: Default Tippy styling

const DataTable = ({ data, onLanguageSelected, itemsPerPage, currentPage }) => {
  const navigate = useNavigate(); // useNavigate hook

  const groupskill = {
    PROGRAMMING_LANG:
      "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300 duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/50",
    FRAMEWORK:
      "border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-300 duration-300 hover:bg-purple-200 dark:hover:bg-purple-800/50",
    LIBRARY:
      "border-green-200 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300 duration-300 hover:bg-green-200 dark:hover:bg-green-800/50",
    OTHER:
      "border-stone-200 bg-stone-100 text-stone-800 dark:border-stone-400 dark:bg-stone-800/30 dark:text-stone-300 duration-300 hover:bg-stone-200 dark:hover:bg-stone-700/50",
  };

  return data.map((row, index) => {
    const rowNumber = currentPage * itemsPerPage + index + 1;

    let trendClass = "";
    switch (row.trending) {
      case "PEAK":
        trendClass =
          "border-green-200 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300";
        break;
      case "AVERAGE":
        trendClass =
          "border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-400 dark:bg-yellow-900/30 dark:text-yellow-300";
        break;
      case "WEAK":
        trendClass =
          "border-red-200 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900/30 dark:text-red-300 font-light";
        break;
      default:
        trendClass =
          "border-stone-200 bg-stone-100 text-stone-800 dark:border-stone-400 dark:bg-stone-800/30 dark:text-stone-300";
    }

    return (
      <tr
        key={row.id}
        className="bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all duration-200"
      >
        <td className="text-center py-3 px-2 border-b border-r border-stone-200 dark:border-stone-700">
          {rowNumber}
        </td>
        <td
          className="border-b border-r border-stone-200 dark:border-stone-700 px-4 py-3 font-medium cursor-pointer hover:underline hover:text-blue-600 dark:hover:text-blue-400"
          onClick={() => navigate(`/position-info/${row.id}`)}
        >
          {row.position}
        </td>
        <td className="border-b border-r border-stone-200 dark:border-stone-700 py-3 font-light">
          <div className="pl-2 space-y-2 text-sm">
            {Array.from({ length: Math.ceil(row.skills.length / 5) }).map(
              (_, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2 flex-wrap">
                  {row.skills
                    .slice(rowIndex * 5, rowIndex * 5 + 5)
                    .map(({ score, skills }, idx) => (
                      <Tippy
                        key={idx}
                        content={skills.group ?? "No description available"}
                        theme="custom"
                        animation="shift-away"
                        duration={[200, 150]}
                        delay={[100, 50]}
                        arrow={true}
                      >
                        <button
                          onClick={() =>
                            onLanguageSelected({
                              id: skills.id,
                              name: skills.name,
                            })
                          }
                          className={`${
                            groupskill[skills.group] ?? groupskill.OTHER
                          } border rounded-full text-sm py-1 px-3 transition-all`}
                        >
                          {skills.name} ({score ?? 0}%)
                        </button>
                      </Tippy>
                    ))}
                </div>
              )
            )}
          </div>
        </td>
        <td className="border-b border-stone-200 dark:border-stone-700 px-4 py-3 text-center font-light text-sm">
          <span className={`${trendClass} rounded-2xl px-4 py-1 border`}>
            {row.trending}
          </span>
        </td>
      </tr>
    );
  });
};

const MainTable = ({
  currentPage,
  handlePageChange,
  data,
  trendingSort,
  onTrendingSortToggle,
  onLanguageSelected,
}) => {
  const itemsPerPage = 11;
  const totalItems = prePos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = prePos.slice(startIndex, endIndex);

  const [name, setName] = useState("");

  return (
    //border-r for line
    <div className="w-full p-4 pr-8 overflow-hidden">
      <div className="flex justify-center">
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 border-collapse overflow-hidden rounded-lg shadow-sm">
            <thead className="bg-stone-50 dark:bg-stone-900">
              <tr>
                <th
                  className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold tracking-[5px] py-3 px-6 text-left border-b border-stone-200 dark:border-stone-700"
                  colSpan="5"
                >
                  Computer Engineering
                </th>
              </tr>
              <tr className="bg-stone-50 dark:bg-stone-900">
                <th className="border-b border-r border-stone-200 dark:border-stone-700 px-2 py-3 font-bold text-center text-stone-900 dark:text-stone-100">
                  No.
                </th>
                <th className="border-b border-r border-stone-200 dark:border-stone-700 px-4 py-3 text-left font-bold text-stone-900 dark:text-stone-100">
                  Position
                </th>
                <th className="border-b border-r border-stone-200 dark:border-stone-700 px-4 py-3 text-left font-bold text-stone-900 dark:text-stone-100">
                  Mostly Skills Requirement{" "}
                  {name && (
                    <>
                      <span className="ml-4 inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-600 rounded-full px-3 py-1 text-sm font-medium shadow-sm">
                        🎯 Focus: <span className="font-semibold">{name}</span>
                        <button
                          onClick={() => {
                            setName("");
                            onLanguageSelected("");
                          }}
                          className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded-full transition-all duration-200 text-xs shadow"
                          title="Clear Focus"
                        >
                          ✕
                        </button>
                      </span>
                    </>
                  )}
                </th>
                <th className="border-b border-stone-200 dark:border-stone-700 px-4 py-3 text-center font-bold relative text-stone-900 dark:text-stone-100">
                  <span>Trending</span>
                  {/* Trending sort */}
                  <button
                    onClick={() => onTrendingSortToggle()}
                    className={`absolute right-3 top-3 duration-300 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 ${
                      trendingSort === "desc" ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ArrowDown size={18} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <DataTable
                data={data}
                onLanguageSelected={({ id, name }) => {
                  onLanguageSelected(id);
                  setName(name);
                }}
                currentPage={currentPage}
                itemsPerPage={13}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainTable;