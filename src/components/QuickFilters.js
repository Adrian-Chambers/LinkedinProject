// src/components/QuickFilters.js
import React, { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import ExperienceFilter from './ExperienceFilter';
import SkillsFilter from './SkillsFilter';
import JobPreferenceFilter from './JobPreferenceFilter';
import OtherPreferencesFilter from './OtherPreferencesFilter';
import AvailabilityFilter from './AvailabilityFilter';

function QuickFilters({ filters, dayAvailability, onFilterChange, onDayAvailabilityChange, onOpenAllFilters }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="quick-filters">
      <div className="filters-container">
        
        {/* Job Preference Filter */}
        <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Job Preference")}>
            Job Preference ▼
          </button>
          {openDropdown === "Job Preference" && (
            <div className="dropdown-menu">
              <JobPreferenceFilter
                jobPreference={filters.jobPreference}
                onChange={onFilterChange}
              />
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div className="filter-group">
          <button className="filter-button" onClick={() => toggleDropdown("Day Availability")}>
            Weekly Availability ▼
          </button>
          {openDropdown === "Day Availability" && (
            <div className="dropdown-menu">
              <AvailabilityFilter
                dayAvailability={dayAvailability}
                onDayAvailabilityChange={onDayAvailabilityChange}
              />
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
              <OtherPreferencesFilter
                preferences={filters}
                onChange={onFilterChange}
              />
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