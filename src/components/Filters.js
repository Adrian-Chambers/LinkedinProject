import React, { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import ExperienceFilter from './ExperienceFilter';
import SkillsFilter from './SkillsFilter';
import OtherPreferencesFilter from './OtherPreferencesFilter';
import AvailabilityFilter from './AvailabilityFilter';

function Filters({ filters, dayAvailability, onFilterChange, onDayAvailabilityChange }) {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(filters.skills || []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange(name, type === 'checkbox' ? checked : value);
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        onFilterChange('skills', [...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    onFilterChange('skills', updatedSkills);
  };

  return (
    <aside className="filters" style={{ padding: "20px", maxWidth: "300px" }}>
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

      {/* Day Availability Filter */}
      <AvailabilityFilter dayAvailability={dayAvailability} onDayAvailabilityChange={onDayAvailabilityChange} />
      
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
    </aside>
  );
}

export default Filters;
