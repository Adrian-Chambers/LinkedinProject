// src/components/Header.js
import React from 'react';
import { FaLinkedin, FaSearch, FaHome, FaUserFriends, FaSuitcase, FaCommentDots, FaBell, FaMapMarkerAlt } from 'react-icons/fa';

function Header({ keyword, location, onFilterChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <header>
      <div className="header-container">
        <div className="navbar-logo">
          <FaLinkedin color="#0073b1" size="2rem" />
        </div>
        <div className="search-bar">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              name="keyword"
              placeholder="Job title, company, keyword, etc."
              value={keyword}
              onChange={handleInputChange}
            />
          </div>
          <div className="location-input">
            <FaMapMarkerAlt className="location-icon" />
            <input
              type="text"
              name="location"
              placeholder="United States"
              value={location}
              onChange={handleInputChange}
            />
          </div>
          <button className="search-button">Search</button>
        </div>
        <div className="navbar-icons">
          <FaHome size="1.5rem" />
          <FaUserFriends size="1.5rem" />
          <FaSuitcase size="1.5rem" />
          <FaCommentDots size="1.5rem" />
          <FaBell size="1.5rem" />
        </div>
      </div>
    </header>
  );
}

export default Header;
