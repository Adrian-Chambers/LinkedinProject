// src/components/JobPreferenceFilter.js
import React from 'react';

function JobPreferenceFilter({ jobPreference, onChange }) {
  const options = [
    { label: "All", value: "all" },
    { label: "On-Site", value: "on-site" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" }
  ];

  return (
    <div>
      <div className="job-preference-options">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`job-preference-option ${jobPreference === option.value ? 'active' : ''}`}
            onClick={() => onChange("jobPreference", option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default JobPreferenceFilter;
