import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { websites } from "../data/websites";

const Promote = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="advice py-10">
      <div>
        <h3 className="text-lg sm:text-md md:text-xl font-medium tracking-[5px] text-neutral-800 bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-100 m-auto text-center py-2 shadow-md">
          <em>Top Job Search Sites</em>
        </h3>
      </div>
      <Slider {...settings} className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 p-1 shadow-lg">
        {websites.map((site, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center p-3"
          >
            <a
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 rounded-lg py-2 shadow-lg hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300">
                <h2 className="text-sm md:text-lg font-semibold text-neutral-800 text-center tracking-[2px] hover:text-neutral-600">
                  {site.name}
                </h2>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Promote;
