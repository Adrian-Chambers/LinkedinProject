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
          <FaLinkedin color="#0073b1" size="2rem" aria-label="LinkedIn logo" />
        </div>
        <div className="search-bar">
          <div className="search-input">
            <FaSearch className="search-icon" aria-label="Search icon" />
            <input
              type="text"
              name="keyword"
              placeholder="Job title, company, keyword, etc."
              value={keyword}
              onChange={handleInputChange}
              aria-label="Job search input"
            />
          </div>
          <div className="location-input">
            <FaMapMarkerAlt className="location-icon" aria-label="Location icon" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={handleInputChange}
              aria-label="Location search input"
            />
          </div>
          <button type="button" className="search-button" aria-label="Search button">Search</button>
        </div>
        <div className="navbar-icons">
          <FaHome size="1.5rem" aria-label="Home icon" />
          <FaUserFriends size="1.5rem" aria-label="Network icon" />
          <FaSuitcase size="1.5rem" aria-label="Jobs icon" />
          <FaCommentDots size="1.5rem" aria-label="Messages icon" />
          <FaBell size="1.5rem" aria-label="Notifications icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
