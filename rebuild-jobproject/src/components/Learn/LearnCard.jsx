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
        className="bg-white dark:bg-neutral-800 shadow-lg dark:shadow-neutral-900/50 
        rounded-2xl p-6 flex flex-col items-center transition-all duration-300 
        hover:shadow-2xl dark:hover:shadow-neutral-900/70 hover:-tranneutral-y-2 
        border border-neutral-200 dark:border-neutral-600 
        dark:hover:border-neutral-500 backdrop-blur-sm"
        style={{ 
          borderLeftColor: '#7f7f7f', 
          borderLeftWidth: '4px' 
        }}
      >
        {/* Image with hover effect and better dark mode support */}
        <div className="image-wrapper mb-4 overflow-hidden rounded-lg w-32 h-32 
        flex items-center justify-center bg-neutral-50 dark:bg-neutral-700/50">
          <img 
            src={img} 
            alt={`${index} logo`} 
            className="w-full h-full object-contain transition-transform duration-300 
            group-hover:scale-110 dark:brightness-110 dark:contrast-90"
          />
        </div>

        {/* Title with better contrast */}
        <h3 className="text-xl font-bold mb-2 text-center 
        text-neutral-900 dark:text-neutral-100">
          {index}
        </h3>

        {/* Description with improved readability */}
        <p className="text-center text-neutral-600 dark:text-neutral-300 
        mb-4 line-clamp-3 leading-relaxed">
          {Description}
        </p>

        {/* Tags with enhanced dark mode colors */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => {
            const { bg, text } = getTagColor(tag);
            return (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full 
                dark:ring-1 dark:ring-neutral-500/30 transition-all duration-200
                hover:scale-105"
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

        {/* Action Button with improved dark mode styling */}
        <a
          href={Website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto px-6 py-2 text-white rounded-full transition-all duration-300 
          transform hover:scale-105 text-center font-medium
          hover:shadow-lg dark:hover:shadow-neutral-900/50
          active:scale-95 focus:ring-2 focus:ring-offset-2 
          dark:focus:ring-offset-neutral-800 focus:ring-neutral-500"
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