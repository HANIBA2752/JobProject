import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "/src/rootlayout/Rootlayout.css";
import { Footer } from "@/components";

export default function Rootlayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
