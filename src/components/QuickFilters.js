// src/components/QuickFilters.js
import React, { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import ExperienceFilter from './ExperienceFilter';
import SkillsFilter from './SkillsFilter';

function QuickFilters({ filters, onFilterChange, onOpenAllFilters }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="quick-filters">
      <div className="filters-container">
        <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Job Preference")}>
            Job Preference ▼
          </button>
          {openDropdown === "Job Preference" && (
            <div className="dropdown-menu">
              <div className="dropdown-item">All</div>
              <div className="dropdown-item">On-Site</div>
              <div className="dropdown-item">Remote</div>
              <div className="dropdown-item">Hybrid</div>
            </div>
          )}
        </div>

        {/* Date Posted Filter */}
        <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Date Posted")}>
            Date Posted ▼
          </button>
          {openDropdown === "Date Posted" && (
            <div className="dropdown-menu">
              <DateRangeFilter
                startDate={filters.startDate}
                endDate={filters.endDate}
                onChange={(name, value) => onFilterChange(name, value)}
              />
            </div>
          )}
        </div>

        {/* Experience Filter */}
        <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Experience")}>
            Experience ▼
          </button>
          {openDropdown === "Experience" && (
            <div className="dropdown-menu">
              <ExperienceFilter
                experience={filters.experience}
                onChange={(name, value) => onFilterChange(name, value)}
              />
            </div>
          )}
        </div>

        {/* Salary Filter */}
        <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Salary")}>
            Salary ▼
          </button>
          {openDropdown === "Salary" && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <label>Min Salary</label>
                <input
                  type="number"
                  name="minSalary"
                  placeholder="Min"
                  value={filters.minSalary}
                  onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="dropdown-item">
                <label>Max Salary</label>
                <input
                  type="number"
                  name="maxSalary"
                  placeholder="Max"
                  value={filters.maxSalary}
                  onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

      {/* Skills Filter */}
      <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Skills")}>
            Skills ▼
          </button>
          {openDropdown === "Skills" && (
            <div className="dropdown-menu">
              <SkillsFilter
                skills={filters.skills}
                onChange={(updatedSkills) => onFilterChange('skills', updatedSkills)}
              />
            </div>
          )}
        </div>

      {/* Other Preferences Filter */}
      <div className="filter-group">
        <button className="filter-button" onClick={() => toggleDropdown("Other Preferences")}>
          Other Preferences ▼
        </button>
        {openDropdown === "Other Preferences" && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <label>
                <input type="checkbox" /> Top Applicant Jobs
              </label>
            </div>
            <div className="dropdown-item">
              <label>
                <input type="checkbox" /> Has Verifications
              </label>
            </div>
            <div className="dropdown-item">
              <label>
                <input type="checkbox" /> Easy Apply
              </label>
            </div>
            <div className="dropdown-item">
              <label>
                <input type="checkbox" /> Fair Chance Employer
              </label>
            </div>
          </div>
        )}
      </div>

      {/* All Filters Button */}
      <button className="filter-button" onClick={onOpenAllFilters}>
          All filters
        </button>
      </div>
    </div>
  );
}

export default QuickFilters;