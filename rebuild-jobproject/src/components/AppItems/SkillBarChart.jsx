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

const colors = ["#ceabd6", "#d3b6db", "#d9c2e1", "#decfe6", "#e4dbec", "#e9e7f1"];
const hoverColor = "#b076c7";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        <p style={{ margin: 0 }}>
          <span style={{ color: "#8884d8" }}>Skill Trending: </span>
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

  useEffect(() => {
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
  }, []);

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
            <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
            <XAxis
              dataKey="skill"
              tick={{ fill: "#6b6b6b", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b6b6b", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
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
                  fill={activeIndex === index ? hoverColor : colors[index % colors.length]}
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
