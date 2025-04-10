// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';
import './Navbar.css';

function Navbar() {
  const [lang, setLang] = useState('EN');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check darkMode from localStorage on load
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  // Toggle language function
  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'EN' ? 'TH' : 'EN'));
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a nav link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        {/* Logo and Mobile Toggle Section */}
        <div className="navbar-top">
          <div className="navbar-logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img src={Logo} alt="logo" className="logo" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu - Shows when hamburger is clicked */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-expanded={mobileMenuOpen}>
          <nav className="mobile-nav">
            <Link to="/" onClick={closeMobileMenu} className="mobile-link">
              HOME
            </Link>
            <Link to="/position/comeng" onClick={closeMobileMenu} className="mobile-link">
              POSITION
            </Link>
            <Link to="/learn" onClick={closeMobileMenu} className="mobile-link">
              LEARN
            </Link>
            <Link to="/contact" onClick={closeMobileMenu} className="mobile-link">
              ABOUT US
            </Link>
          </nav>
          
          {/* Mobile Settings */}
          <div className="mobile-settings">
            <div className="mobile-theme-toggle" onClick={toggleDarkMode}>
              <FaRegLightbulb className={`theme-icon ${darkMode ? 'active' : ''}`} />
              <span>Toggle Theme</span>
            </div>
            <div className="mobile-language" onClick={toggleLanguage}>
              <span>Language: {lang}</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                <span className="nav-text">HOME</span>
              </Link>
            </li>
            <li>
              <Link to="/position/comeng" className="nav-link">
                <span className="nav-text">POSITION</span>
              </Link>
            </li>
            <li>
              <Link to="/learn" className="nav-link">
                <span className="nav-text">LEARN</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                <span className="nav-text">ABOUT US</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Settings */}
        <div className="desktop-settings">
          <div className="theme-toggle" onClick={toggleDarkMode}>
            <FaRegLightbulb className={`theme-icon ${darkMode ? 'active' : ''}`} />
          </div>
          <div className="language-selector" onClick={toggleLanguage}>
            <span>{lang}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;