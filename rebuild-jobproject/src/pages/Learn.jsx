import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "../components/Learn/Learn.css";
import "animate.css";
import { learnData } from "@/components/data/learn-data";
import { getTagColor } from "@/components/data/tag-colors";
import LearnCard from "../components/Learn/LearnCard";

function Learn() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique tags from all resources
  const allTags = useMemo(() => {
    const tags = new Set();
    learnData.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filtering logic
  const filteredData = useMemo(() => {
    return learnData.filter(
      (item) =>
        (
          item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.index.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()))
        ) &&
        (
          selectedTags.length === 0 ||
          selectedTags.some((tag) => item.tags.includes(tag)
        ))
    );
  }, [searchTerm, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="learn-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header-section text-center"
      >
        <h1
          className="title text-4xl md:text-6xl font-bold 
          text-neutral-800 dark:text-slate-100 
          bg-gradient-to-r from-neutral-700 to-neutral-900 
          dark:from-slate-200 dark:to-slate-100 
          bg-clip-text text-transparent"
        >
          Unlock Your Learning Potential
        </h1>
        <p
          className="subtitle text-xl text-neutral-600 dark:text-slate-300 
          mb-8 mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          Discover the Best Online Learning Platforms
        </p>
      </motion.div>

      {/* Search Section */}
      <div className="search-filter-container max-w-5xl mx-auto px-4">
        <div
          className="search-bar flex items-center rounded-full shadow-md mb-6"
          style={{
            borderLeft: "4px solid #7f7f7f",
            borderRadius: "0 25px 25px 0",
          }}
        >
          <input
            type="text"
            placeholder="Search learning resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 rounded-full bg-transparent outline-none 
            text-neutral-700 dark:text-slate-100 font-medium"
          />
          <button
            className="px-6 py-3 rounded-full transition-all duration-300
            hover:shadow-lg dark:hover:shadow-slate-900/50
            active:scale-95 focus:ring-2 focus:ring-offset-2 
            dark:focus:ring-offset-slate-800 focus:ring-neutral-500
            font-medium"
            style={{
              backgroundColor: "#7f7f7f",
              color: "white",
            }}
          >
            Search
          </button>
        </div>

        {/* Tag Filters */}
        <div className="tag-filters flex flex-wrap justify-center gap-2 mb-8">
          {allTags.map((tag) => {
            const { bg, text } = getTagColor(tag);
            const isSelected = selectedTags.includes(tag);

            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1 rounded-full text-sm font-medium 
                transition-all duration-300 hover:scale-105 active:scale-95
                focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                style={{
                  backgroundColor: isSelected ? bg : "rgba(127, 127, 127, 0.15)",
                  color: isSelected ? text : "#6f6f6f",
                  border: isSelected ? `1px solid ${text}` : 
                    "1px solid rgba(127, 127, 127, 0.2)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="item-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto"
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <LearnCard
              key={item.index}
              index={item.index}
              Website={item.Website}
              Description={item.Description}
              img={item.img}
              tags={item.tags}
            />
          ))
        ) : (
          <div className="col-span-full text-center no-results">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-700 dark:text-slate-300">
              No resources found
            </h3>
            <p className="text-neutral-500 dark:text-slate-400">
              Try a different search term or remove some filters
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Learn;