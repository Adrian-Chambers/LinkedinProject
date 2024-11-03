// src/JobDetails.js
import React from 'react';

function JobDetails({ job }) {
  if (!job) {
    return <p className="select-job-message">Please select a job to view details.</p>;
  }

  return (
    <div className="job-details">
      {/* Job Title */}
      <h2>{job.title}</h2>

      {/* Company and Location */}
      <div className="job-details-info">
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Experience:</strong> {job.experienceRange.min} - {job.experienceRange.max} years</p>
        <p><strong>Salary:</strong> ${job.salaryRange.min} - ${job.salaryRange.max}</p>
      </div>

      {/* Job Description */}
      <p className="job-details-description"><strong>Description: </strong>{job.description}</p>

      {/* Skills Section */}
      <div className="job-details-skills">
        <h4>Skills</h4>
        <div className="skills-list">
          {job.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div><br />

      {/* Additional Preferences */}
      <div className="job-details-preferences">
        <h4>Additional Preferences</h4>
        <p>{job.verified ? "✅ Verified" : "❌ Not Verified"}</p>
        <p>{job.easyApply ? "✅ Easy Apply" : "❌ Not Easy Apply"}</p>
        <p>{job.fairChance ? "✅ Fair Chance" : "❌ Not Fair Chance"}</p>
        <p>{job.topApplicant ? "✅ Top Applicant" : "❌ Not Top Applicant"}</p>
      </div>
    </div>
  );
}

export default JobDetails;
