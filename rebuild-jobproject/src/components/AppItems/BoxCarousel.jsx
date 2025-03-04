import React from "react";

const BoxCarousel = ({ data }) => {
  return (
    <div className="grid gap-1 grid-cols-[repeat(auto-fit,minmax(80px,1fr))]">
      {data.map((img, index) => (
        <div
          key={index}
          className="h-10 w-10 flex items-center justify-center rounded-lg transition-transform hover:scale-105"
        >
          <img
            src={img.url}
            alt={img.name}
            className=" h-5 w-5 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default BoxCarousel;
