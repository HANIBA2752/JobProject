import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colors = ["#f59e0b", "#fcb6cf", "#3b82f6", "#8b5cf6", "#ef4444", "#06b6d4"];
const darkColors = ["#f59e0b", "#fcb6cf", "#3b82f6", "#8b5cf6", "#ef4444", "#06b6d4"];
const hoverColor = "#333";
const darkHoverColor = "#fff";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2.5 rounded-lg shadow-lg"
      >
        <p className="m-0 font-bold text-gray-900 dark:text-white">{label}</p>
        <p className="m-0 text-gray-700 dark:text-gray-300">
          <span className="text-blue-500 dark:text-blue-400">Skill Trending: </span>
          {payload[0].value}%
        </p>
      </div>
    );
  }

  return null;
}

function SkillBarChart() {
  const [skills, setSkills] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const fetchSkills = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/query/mainpageScore`
        );
        const data = await res.json();
        setSkills(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    return () => observer.disconnect();
  }, []);

  const currentColors = isDark ? darkColors : colors;
  const currentHoverColor = isDark ? darkHoverColor : hoverColor;

  return (
    <div
      className="absolute"
      style={{
        top: "32.5%",
        left: "72.5%",
        width: "28%",
        height: "45%",
      }}
    >
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-14 pr-32 -mt-28"
        style={{ width: "180%", height: "350px" }}
      >
        <ResponsiveContainer width="84.9%" height="110%">
          <BarChart
            data={skills}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke={isDark ? "#6b7280" : "#f0f0f0"} 
            />
            <XAxis
              dataKey="skill"
              tick={{ 
                fill: isDark ? "#f3f4f6" : "#6b6b6b", 
                fontSize: 12 
              }}
              axisLine={{ stroke: isDark ? "#9ca3af" : "#ccc" }}
              tickLine={false}
            />
            <YAxis
              tick={{ 
                fill: isDark ? "#f3f4f6" : "#6b6b6b", 
                fontSize: 12 
              }}
              axisLine={{ stroke: isDark ? "#9ca3af" : "#ccc" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="score"
              animationDuration={800}
              radius={[6, 6, 0, 0]}
              onMouseOver={(_, index) => setActiveIndex(index)}
            >
              {skills.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? currentHoverColor : currentColors[index % currentColors.length]}
                  style={{
                    transition: "transform 0.2s",
                    transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SkillBarChart;