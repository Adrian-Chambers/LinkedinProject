// src/JobListings.js
import React from 'react';
import JobCard from './JobCard';

function JobListings({ jobs, onJobClick }) {
  return (
    <section className="job-listings">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobCard key={index} job={job} onClick={() => onJobClick(job)} />
        ))
      ) : (
        <p className="no-jobs-message">No jobs found.</p>
      )}
    </section>
  );
}

export default JobListings;
