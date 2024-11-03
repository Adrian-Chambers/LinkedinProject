// src/components/SkillsFilter.js
import React, { useState } from 'react';

function SkillsFilter({ skills, onChange }) {
  const [skillInput, setSkillInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      // Add skill if it doesn't already exist
      if (!skills.includes(skillInput.trim())) {
        onChange([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    onChange(updatedSkills);
  };

  return (
    <div className="filter-section">
      <label>Skills</label>
      <input
        type="text"
        value={skillInput}
        placeholder="Enter a skill and press Enter"
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="skills-list">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <button type="button" onClick={() => handleRemoveSkill(skill)}>
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsFilter;
