import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import JobListings from './components/JobListings';
import JobDetails from './components/JobDetails';
import QuickFilters from './components/QuickFilters';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    skills: []
  });
  const [dayAvailability, setDayAvailability] = useState({
    monday: 'available',
    tuesday: 'available',
    wednesday: 'available',
    thursday: 'available',
    friday: 'available',
    saturday: 'available',
    sunday: 'available'
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/jobs.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log("Filters updated:", name, value);
  };

  const handleDayAvailabilityChange = (day, status) => {
    setDayAvailability(prev => ({ ...prev, [day]: status }));
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredJobs = jobs.filter(job => {
    const { keyword, location, jobPreference, experience, minSalary, maxSalary, skills, startDate, endDate } = filters;

    // Keyword filter
    if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase())) return false;

    // Location filter
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;

    // Job preference filter
    if (jobPreference !== 'all' && job.type.toLowerCase() !== jobPreference.toLowerCase()) return false;

    // Experience filter
    const jobExpMin = parseInt(job.experienceRange.min);
    const jobExpMax = parseInt(job.experienceRange.max);
    const userExperience = parseInt(experience);
    if (experience && (userExperience < jobExpMin || userExperience > jobExpMax)) return false;

    // Salary range filter
    const jobSalaryMin = parseInt(job.salaryRange.min);
    const jobSalaryMax = parseInt(job.salaryRange.max);
    if (minSalary && jobSalaryMin < parseInt(minSalary)) return false;
    if (maxSalary && jobSalaryMax > parseInt(maxSalary)) return false;

    // Skills filter
    if (skills.length > 0) {
      const jobSkillsLower = job.skills.map(skill => skill.toLowerCase());
      const hasMatchingSkills = skills.every(skill => jobSkillsLower.includes(skill.toLowerCase()));
      if (!hasMatchingSkills) return false;
    }

    // Date Posted filter
    const jobDate = new Date(job.datePosted);
    if (startDate && jobDate < new Date(startDate)) return false;
    if (endDate && jobDate > new Date(endDate)) return false;

    // Day availability filter
    const days = Object.keys(dayAvailability);
    for (const day of days) {
      if (dayAvailability[day] === 'unavailable' && job.schedule[day]) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="App">
      <Header keyword={filters.keyword} location={filters.location} onFilterChange={handleFilterChange} />

      <div className="main-container">
        <QuickFilters
          filters={filters}
          dayAvailability={dayAvailability}
          onFilterChange={handleFilterChange}
          onDayAvailabilityChange={handleDayAvailabilityChange}
          onOpenAllFilters={toggleFilters}
        />

        <div className="main-content">
          <div className="job-listings-panel">
            {loading ? (
              <p>Loading jobs...</p>
            ) : (
              <JobListings jobs={filteredJobs} onJobClick={handleJobClick} />
            )}
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
            <Filters
              filters={filters}
              dayAvailability={dayAvailability}
              onFilterChange={handleFilterChange}
              onDayAvailabilityChange={handleDayAvailabilityChange}
            />
            <button className="close-filters-button" onClick={toggleFilters}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;