import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import "../components/Pos-Detail/detail.css";
import "animate.css";

function PosDetail() {
  const { id } = useParams();
  const [desdata, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details
  const getDesJob = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
      );
      if (!resp.ok) throw new Error("Failed to fetch job data");
      const jobData = await resp.json();
      setData(jobData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDesJob();
  }, [id]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !id || !desdata?.position) {
    return (
      <div className="text-center text-red-600 text-lg font-semibold min-h-screen flex items-center justify-center">
        {error || "ไม่พบข้อมูลของตำแหน่งงานนี้"}
      </div>
    );
  }

  return (
    <div className="posDetail-container">
      <div className="w-full mb-10 pb-4 border-b border-gray-300 dark:border-gray-700 flex flex-col md:flex-row md:items-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md
          ${
            desdata.trending?.name === "PEAK"
              ? "bg-green-200 text-green-700"
              : desdata.trending?.name === "WEAK"
              ? "bg-red-200 text-red-700"
              : "bg-yellow-200 text-yellow-700"
          }
          font-semibold text-sm tracking-wide`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {desdata.trending?.name || "N/A"}
        </div>
        <h1 className="text-3xl md:text-4xl md:ml-4 font-bold text-gray-800 dark:text-white animate__animated animate__fadeInDown">
          {desdata.position.name}
        </h1>
      </div>

      <div className="posDetail-content animate__animated animate__fadeInUp">
        <h2 className="text-3xl">Overview</h2>
        <p className="mt-4">
          {desdata.description || "No description available."}
        </p>

        <h3 className="text-2xl">Skills</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {(desdata.job_skills ?? []).map((i, index) => (
            <a
              className="bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md"
              href={`https://www.google.com/search?q=${i.skills.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span key={index}>{i.skills.name}</span>
            </a>
          )) || "No skills listed."}
        </div>

        <div className="mt-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Spider Web Chart
          </h3>
          <div className="relative" style={{ height: "500px" }}>
            <Radar
              width={500}
              height={500}
              data={{
                labels: (desdata.job_skills ?? []).map((i) => i.skills.name),
                datasets: [
                  {
                    label: "Skill Proficiency",
                    data: (desdata.job_skills ?? []).map((i) => i.score),
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    borderColor: "rgba(59, 130, 246, 1)",
                    borderWidth: 2,
                    pointBackgroundColor: "rgba(59, 130, 246, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(59, 130, 246, 1)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                      stepSize: 20,
                      color: "#4B5563", // Tailwind gray-600
                      backdropColor: "transparent",
                      font: { size: 12 },
                    },
                    pointLabels: {
                      font: { size: 14, weight: "500" },
                      color: "#111827", // Tailwind gray-900
                    },
                    grid: { color: "rgba(203, 213, 225, 0.4)" }, // gray-300 with transparency
                    angleLines: { color: "rgba(203, 213, 225, 0.4)" },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      font: { size: 14 },
                      color: "#111827", // gray-900
                    },
                  },
                  tooltip: {
                    backgroundColor: "#1E40AF", // blue-800
                    titleFont: { weight: "bold" },
                    bodyFont: { size: 13 },
                    borderColor: "#93C5FD", // blue-300
                    borderWidth: 1,
                  },
                },
              }}
            />
          </div>
        </div>
        <p className="mt-4">
          {desdata.responsibilities || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default PosDetail;
