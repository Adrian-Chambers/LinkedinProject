// src/components/OtherPreferencesFilter.js
import React from 'react';

function OtherPreferencesFilter({ preferences, onChange }) {
  const options = [
    { label: "Top Applicant Jobs", name: "topApplicant" },
    { label: "Has Verifications", name: "hasVerifications" },
    { label: "Easy Apply", name: "easyApply" },
    { label: "Fair Chance Employer", name: "fairChance" }
  ];

  return (
    <div>
      <div className="other-preferences-options">
        {options.map((option) => (
          <div key={option.name} className="checkbox-item">
            <input
              type="checkbox"
              id={option.name}
              name={option.name}
              checked={preferences[option.name]}
              onChange={(e) => onChange(option.name, e.target.checked)}
            />
            <label htmlFor={option.name}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherPreferencesFilter;
