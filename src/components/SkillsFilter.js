import React, { useState } from 'react';

function SkillsFilter({ skills, onChange }) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      onChange([...skills, skillInput.trim()]);
      setSkillInput(''); // Clear input after adding
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(); // Add skill on Enter key press as well
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    onChange(updatedSkills);
  };

  return (
    <div className="filter-section">
      <input
        type="text"
        value={skillInput}
        placeholder="Type a skill and press Enter or Add"
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddSkill}>Add Skill</button>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <button type="button" onClick={() => handleRemoveSkill(skill)}>✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsFilter;
