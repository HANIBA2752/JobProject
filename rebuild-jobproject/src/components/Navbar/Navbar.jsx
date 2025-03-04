import React from "react";
import { Link } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";
import RightNavbar from "./RightNavbar";
import "/src/components/Navbar/Navbar.css";

function Navbar() {
  return (
    <div className="main-nav flex justify-center w-screen bg-black/50 border-white border-opacity-20 backdrop-blur-sm z-10">
      <nav className="w-[70%]">
        <ul className="flex justify-around items-center">
          <LeftNavbar />
          <li>
            <Link to="/">
              <span className="nav-text">HOME</span>
            </Link>
          </li>
          <li>
            <Link to="/position/comeng">
              <span className="nav-text">POSITION</span>
            </Link>
          </li>
          <li>
            <Link to="/learn">
              <span className="nav-text">LEARN</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <span className="nav-text">ABOUT US</span>
            </Link>
          </li>
          <RightNavbar />
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
