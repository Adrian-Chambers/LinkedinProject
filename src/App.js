import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import JobListings from './components/JobListings';
import JobDetails from './components/JobDetails';
import QuickFilters from './components/QuickFilters';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    startDate: '',
    endDate: '',
    jobPreference: 'all',
    experience: '',
    minSalary: '',
    maxSalary: '',
    topApplicant: false,
    hasVerifications: false,
    easyApply: false,
    fairChance: false,
    skills: [], // Ensure skills is defined as an empty array
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/jobs.json')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const toggleFilters = () => {
    setShowFilters(prevShowFilters => !prevShowFilters); // Toggle visibility
  };

  const filteredJobs = jobs.filter(job => {
    // Keyword filter
    if (filters.keyword && !job.title.toLowerCase().includes(filters.keyword.toLowerCase())) {
      return false;
    }

    // Location filter
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Job preference filter
    if (filters.jobPreference !== 'all' && job.type.toLowerCase() !== filters.jobPreference.toLowerCase()) {
      return false;
    }

    // Experience filter
    if (filters.experience && (job.experienceRange.min > filters.experience || job.experienceRange.max < filters.experience)) {
      return false;
    }

    // Salary range filter
    if (filters.minSalary && job.salaryRange.min < filters.minSalary) {
      return false;
    }
    if (filters.maxSalary && job.salaryRange.max > filters.maxSalary) {
      return false;
    }

    // Checkboxes
    if (filters.topApplicant && !job.topApplicant) return false;
    if (filters.hasVerifications && !job.verified) return false;
    if (filters.easyApply && !job.easyApply) return false;
    if (filters.fairChance && !job.fairChance) return false;

    return true;
  });

  return (
    <div className="App">
      <Header keyword={filters.keyword} location={filters.location} onFilterChange={handleFilterChange} />

      <div className="main-container">
      <QuickFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenAllFilters={toggleFilters} // Use toggle function here
      />

        <div className="main-content">
          <div className="job-listings-panel">            
            <JobListings jobs={filteredJobs} onJobClick={handleJobClick} />
          </div>

          <div className="job-details-panel">
            {selectedJob ? (
              <JobDetails job={selectedJob} />
            ) : (
              <p className="select-job-message">Select a job to view details</p>
            )}
          </div>
        </div>

        {showFilters && (
          <div className={`filters-overlay ${showFilters ? "show" : ""}`}>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            <button className="close-filters-button" onClick={toggleFilters}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;