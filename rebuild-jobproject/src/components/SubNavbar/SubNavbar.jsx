import React from 'react';
import Logo from '../../assets/Logo.png';
import './SubNavbar.css'
import { Link } from 'react-router-dom';


function SubNavbar() {

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-neutral-900 border-b border-neutral-700 navfont">
      {/* Wrapper for Logo and Menu */}
      <div className="flex items-center space-x-6 w-full md:w-auto">

        {/* Logo Section */}
        <Link to="/"><img src={Logo} alt="Logo" className="h-8" /></Link>
        
        {/* Menu Section */}
        <div className="hidden md:flex space-x-6">
          <Link to="/position/comeng" className="text-neutral-300 hover:text-white text-sm font-medium">
            Position
          </Link>
          <Link to="/learn" className="text-neutral-300 hover:text-white text-sm font-medium">
            Learn
          </Link>
          <Link to="/about" className="text-neutral-300 hover:text-white text-sm font-medium">
            About
          </Link>
        </div>
      </div>

      {/* Icons and Search Section */}
      <div className="hidden md:flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for position"
          className="px-3 py-1 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
        <button className="text-neutral-400 hover:text-white">
          🔔
        </button>
        {/* <button className="text-neutral-400 hover:text-white">
          📞
        </button> */}
        <button className="text-neutral-400 hover:text-white">
          ⚙️
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button className="text-neutral-400 hover:text-white">
          ☰
        </button>
      </div>
    </div>
  );
}

export default SubNavbar;
