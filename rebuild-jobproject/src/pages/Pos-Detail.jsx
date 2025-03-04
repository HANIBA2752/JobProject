import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { posDetail } from "../components/data/pos-detail"; // import pos-detail.js
import "../components/Pos-Detail/detail.css";
import "animate.css";
import { Radar } from "react-chartjs-2";
import 'chart.js/auto'; // ADD THIS

function PosDetail() {
  const ref = useRef();

  const { id } = useParams(); // ใช้ useParams เพื่อดึง id จาก URL

  if (!id) {
    return <div>ไม่พบข้อมูลของตำแหน่งงานนี้</div>;
  }

  const [desdata, setData] = useState({});

  function getTrainingClass(value) {
    switch (value) {
      case "HOT":
        return "border-red-200 bg-red-100 text-red-800";
      case "POPULAR":
        return "border-yellow-200 bg-yellow-100 text-yellow-800";
      case "GROWING":
        return "border-green-200 bg-green-100 text-green-800 font-light";
      default:
        return "border-neutral-200 bg-neutral-100 text-neutral-800";
    }
  }

  async function getdesjob() {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);
    const jobdata = await resp.json();
    setData(jobdata);
  }

  useEffect(() => {
    return () => {
      void getdesjob();
    };
  }, []);

  if(ref.current) return

  if (!desdata.position) return <>Loading...</>;

  return (
    <div className="posDetail-container">
      <div className="posDetail-header">
        <h1 className="posDetail-title animate__animated animate__zoomIn">
          {desdata.position?.name}
        </h1>
        <p
          className={`posDetail-trending  border px-4 py-2 rounded-full inline-block ${getTrainingClass(
            desdata.trending_level
          )}`}
        >
          {desdata.trending_level}
        </p>
      </div>

      <div className="posDetail-content posDetail-title animate__animated animate__zoomIn">
        <h2>Job Description</h2>
        <p>{desdata.description}</p>

        <h3>Skills</h3>
        <p>
          {(desdata.job_skills ?? []) // [{"skills": { name: "Test"}}, {"skills": { name: "Test2"}}]
            .map((i) => i.skills.name) // ["Test", "Test2"]
            .join(", ")}
        </p>
        <Radar
          ref={ref}
          data={{
            labels: (desdata.job_skills ?? []) // [{"skills": { name: "Test"}}, {"skills": { name: "Test2"}}]
              .map((i) => i.skills.name),
            datasets: [
              {
                label: "Most used tools",
                data: (desdata.job_skills ?? []) // [{"skills": { name: "Test"}}, {"skills": { name: "Test2"}}]
                .map((i) => i.score),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              r: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default PosDetail;
