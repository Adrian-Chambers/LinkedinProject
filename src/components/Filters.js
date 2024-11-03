import React, { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import ExperienceFilter from './ExperienceFilter';
import SkillsFilter from './SkillsFilter';
import OtherPreferencesFilter from './OtherPreferencesFilter';
import AvailabilityFilter from './AvailabilityFilter';

function Filters({
  filters,
  dayAvailability,
  hybridDayPreference,
  onFilterChange,
  onDayAvailabilityChange,
  onHybridDayPreferenceChange,
  onSaveFilters,
  savedFilters,
  onApplySavedFilter,
  onDeleteSavedFilter,
  onCloseFilters
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange(name, type === 'checkbox' ? checked : value);
  };

  return (
    <aside className="filters" style={{ padding: "20px", maxWidth: "300px", position: "relative" }}>
      {/* "X" Close Button */}
      <button className="close-filters-x" onClick={onCloseFilters}>×</button>


      <h3>All Filters</h3>

      <div>
        <label htmlFor="keyword">Keyword</label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Search by job title or keyword"
          value={filters.keyword}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Date Posted</label>
        <DateRangeFilter
          startDate={filters.startDate}
          endDate={filters.endDate}
          onChange={onFilterChange}
        />
      </div>

      <div>
        <label htmlFor="job-preference">Job Preference</label>
        <select
          id="job-preference"
          name="jobPreference"
          value={filters.jobPreference}
          onChange={(e) => onFilterChange("jobPreference", e.target.value)}
        >
          <option value="all">All</option>
          <option value="on-site">On-Site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <AvailabilityFilter
        dayAvailability={dayAvailability}
        hybridDayPreference={hybridDayPreference}
        jobPreference={filters.jobPreference}
        onDayAvailabilityChange={onDayAvailabilityChange}
        onHybridDayPreferenceChange={onHybridDayPreferenceChange}
      />

      
      <div>
        <label htmlFor="experience">Experience</label>
        <ExperienceFilter
          experience={filters.experience}
          onChange={onFilterChange}
        />
      </div>

      <div>
        <label>Salary Range</label>
        <div className="salary-row">
          <input
            type="number"
            id="min-salary"
            name="minSalary"
            placeholder="Min Salary"
            value={filters.minSalary}
            onChange={handleChange}
          />
          <span className="to-text">to</span>
          <input
            type="number"
            id="max-salary"
            name="maxSalary"
            placeholder="Max Salary"
            value={filters.maxSalary}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Skills</label>
        <SkillsFilter
          skills={filters.skills}
          onChange={(updatedSkills) => onFilterChange('skills', updatedSkills)}
        />
      </div>

      <div>
        <label>Other Preferences</label>
        <OtherPreferencesFilter
          preferences={filters}
          onChange={onFilterChange}
        />
      </div>

      {/* Save Filters and Saved Filters Section */}
      <div className="save-filters-section">
        <button className="save-filters-button" onClick={() => onSaveFilters(filters, dayAvailability, hybridDayPreference)}>
          Save Filters
        </button>

        <div className="saved-filters">
          <h4>Saved Filters
            <span className="info-icon" title="Save your filter settings for quick access in the future. Use the 'Save Filters' button above to save your current filters. You can apply or delete saved filters from the list below.">ℹ️</span>
          </h4>
          {savedFilters.length > 0 ? (
            <ul>
              {savedFilters.map((savedFilter, index) => (
                <li key={index}>
                  <span>{savedFilter.filterName}</span>
                  <button onClick={() => onApplySavedFilter(savedFilter)}>Apply</button>
                  <button onClick={() => onDeleteSavedFilter(savedFilter.filterName)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-saved-filters-text">
              No saved filters. You can save your current filters for future use by clicking on the "Save Filters" button.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Filters;
