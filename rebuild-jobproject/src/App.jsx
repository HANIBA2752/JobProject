import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppMidText, AppBox, DescApp, Promote, Footer } from "./components";
import Position from "./pages/Position";
import PosDetail from "./pages/Pos-Detail";
import SkillBarChart from "../src/components/AppItems/SkillBarChart";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppMidText />} />
        <Route path="/position" element={<Position />} />
        <Route path="/position-info/:id" element={<PosDetail />} />
      </Routes>
      <AppBox />
      <DescApp />
      <Promote />
    </div>
  );
};

export default App;
