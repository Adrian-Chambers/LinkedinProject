// src/components/Filters.js
import React, { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import ExperienceFilter from './ExperienceFilter';
import SkillsFilter from './SkillsFilter';

function Filters({ filters, onFilterChange }) {
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
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="on-site">On-Site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <ExperienceFilter
        experience={filters.experience}
        onChange={onFilterChange}
      />

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

      <SkillsFilter
        skills={filters.skills}
        onChange={(updatedSkills) => onFilterChange('skills', updatedSkills)}
      />

      <div>
        <label>Other Preferences</label>
        <div className="checkbox-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="top-applicant"
              name="topApplicant"
              checked={filters.topApplicant}
              onChange={handleChange}
              style={{ marginRight: "6px" }}
            />
            <label htmlFor="top-applicant" style={{ margin: 0 }}>Top Applicant Jobs</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="has-verifications"
              name="hasVerifications"
              checked={filters.hasVerifications}
              onChange={handleChange}
              style={{ marginRight: "6px" }}
            />
            <label htmlFor="has-verifications" style={{ margin: 0 }}>Has Verifications</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="easy-apply"
              name="easyApply"
              checked={filters.easyApply}
              onChange={handleChange}
              style={{ marginRight: "6px" }}
            />
            <label htmlFor="easy-apply" style={{ margin: 0 }}>Easy Apply</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="fair-chance"
              name="fairChance"
              checked={filters.fairChance}
              onChange={handleChange}
              style={{ marginRight: "6px" }}
            />
            <label htmlFor="fair-chance" style={{ margin: 0 }}>Fair Chance Employer</label>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Filters;
