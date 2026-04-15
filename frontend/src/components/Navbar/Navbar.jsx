import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Sidebar handlers
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);

  const handleLinkClick = () => {
    closeSidebar();
    setMobileDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">SciConnect</div>

        <ul className="navLinks">
          <li><Link to="/">Home</Link></li>
          <li
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="dropdown-trigger" onClick={toggleDropdown}>Pages ▾</span>
            {dropdownOpen && (
              <ul className="dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <li><Link to="/about" onClick={() => setDropdownOpen(false)}>About</Link></li>
                <li><Link to="/committee" onClick={() => setDropdownOpen(false)}>Committee</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/speakers">Speakers</Link></li>
          <li><Link to="/program">Program</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="actions">
          <Link to="/register" className="filledBtn desktop-register">Register</Link>
        </div>

        <button className="hamburger" onClick={openSidebar}>
          <FaBars />
        </button>
      </nav>

      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">SciConnect</div>
          <button className="close-sidebar" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="sidebar-nav">
          <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
          <li className="mobile-dropdown">
            <div className="mobile-dropdown-trigger" onClick={toggleMobileDropdown}>
              Pages {mobileDropdownOpen ? "▴" : "▾"}
            </div>
            {mobileDropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/committee" onClick={handleLinkClick}>Committee</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/speakers" onClick={handleLinkClick}>Speakers</Link></li>
          <li><Link to="/program" onClick={handleLinkClick}>Program</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
          <li className="sidebar-register">
            <Link to="/register" className="filledBtn" onClick={handleLinkClick}>Register</Link>
          </li>
        </ul>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Navbar;