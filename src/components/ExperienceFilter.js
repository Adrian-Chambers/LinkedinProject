// src/components/ExperienceFilter.js
import React from 'react';

function ExperienceFilter({ experience, onChange }) {
  return (
    <div>
      <label htmlFor="experience">Experience (Years)</label>
      <input
        type="number"
        id="experience"
        name="experience"
        placeholder="Enter years of experience"
        value={experience}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    </div>
  );
}

export default ExperienceFilter;
