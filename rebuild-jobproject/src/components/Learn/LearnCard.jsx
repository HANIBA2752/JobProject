import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { getTagColor } from '../../components/data/tag-colors';

const LearnCard = ({ index, Website, Description, img, tags }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div 
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            ease: "easeOut" 
          }
        }
      }}
      initial="hidden"
      animate={mainControls}
      className="card-container group"
    >
      <div 
        className="dark:bg-neutral-700 bg-white shadow-lg rounded-2xl p-6 
        flex flex-col items-center transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-2 border 
        border-gray-200 dark:border-neutral-600"
        style={{ 
          borderLeftColor: '#7f7f7f', 
          borderLeftWidth: '4px' 
        }}
      >
        {/* Image with hover effect */}
        <div className="image-wrapper mb-4 overflow-hidden rounded-lg w-32 h-32 flex items-center justify-center">
          <img 
            src={img} 
            alt={`${index} logo`} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-center text-gray-800 dark:text-white">
          {index}
        </h3>

        {/* Description */}
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {Description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => {
            const { bg, text } = getTagColor(tag);
            return (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full"
                style={{ 
                  backgroundColor: bg,
                  color: text,
                  fontWeight: 600
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Action Button */}
        <a
          href={Website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto px-6 py-2 text-white rounded-full transition duration-300 
                     transform hover:scale-105 text-center"
          style={{ 
            backgroundColor: '#7f7f7f',
            boxShadow: '0 4px 6px rgba(127, 127, 127, 0.3)'
          }}
        >
          Explore
        </a>
      </div>
    </motion.div>
  );
};

export default LearnCard;