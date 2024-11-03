// src/JobCard.js
import React from 'react';

function JobCard({ job, onClick }) {
  return (
    <div className="job-card" onClick={onClick}>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location} ({job.type})</p>
      <p>${job.salaryRange.min} - ${job.salaryRange.max}</p>
    </div>
  );
}

export default JobCard;
