import React from "react";
import { Link } from "react-router-dom";
import "animate.css";
import ScreenImage2 from "../../assets/Chart4.png"; // นำเข้ารูปใหม่

function AppMidText() {
  return (
    <section className="section1 relative">
      <div className="App-topic">
        <div className="AppMidText-container">
          <div>
            <div className="web-topic topic-animate relative">
              <h1 className="topicText">~position</h1>
              <h1 className="topicText">explorer</h1>
              <div className="subText mt-4">
                Position Explorer lets you explore job roles in IT and tech,
                helping you plan your career path with key{" "}
                <span className="text-[#1f1f1f] font-bold underline decoration-neutral-200/40">
                  insights.
                </span>
              </div>
              <div className="linkText mt-4">
                <Link to="/position/comeng">
                  searching for computer engineer roles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppMidText;
