import React from "react";

const LearnCard = ({ index, Website, Description, img }) => {
  return (
    <div className="dark:bg-neutral-800 dark:text-white animate__animated animate__slideInUp bg-white shadow-md rounded-2xl p-6 my-8 border border-gray-300 w-80 mx-3 flex flex-col items-center transition-shadow duration-300 hover:shadow-xl">
      {/* รูปภาพ */}
      <img src={img} alt={`Resource ${index}`} className="w-24 h-24 object-contain mb-4 rounded-lg" />

      <h3 className="text-lg font-bold mb-2 text-center">{index}</h3>
      <p className=" dark:text-white text-gray-600 text-center mb-4">{Description}</p>
      
      <a
        href={Website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border-2 border-gray-200 bg-gray-100 text-blue-600 font-bold mt-auto px-4 py-2 rounded-lg hover:opacity-80 transition-opacity duration-500 hover:bg-gray-400"
      >
        Read More
      </a>
    </div>
  );
};

export default LearnCard;
