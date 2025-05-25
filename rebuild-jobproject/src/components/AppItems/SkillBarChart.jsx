import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const exampleSkills = [
  { name: "JavaScript", score: 85 },
  { name: "Python", score: 90 },
  { name: "React", score: 80 },
  { name: "Node.js", score: 75 },
  { name: "SQL", score: 70 },
  { name: "TypeScript", score: 88 },
];

function SkillBarChart() {
  return (
    <div
      className="relative w-full bg-cover bg-center py-8"
      style={{
        backgroundImage:
          "url('/your-image-path/1c22761b-ecbd-4a24-892f-6d3638f5cc30.png')",
      }}
    >
      {/* Absolute chart placement */}
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-14 pr-32 -mt-16"
        style={{ width: "55%", height: "350px" }}
      >
        <ResponsiveContainer width="84.9%" height="110%">
          <BarChart data={exampleSkills}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SkillBarChart;
