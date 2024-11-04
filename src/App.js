import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import JobListings from './components/JobListings';
import JobDetails from './components/JobDetails';
import QuickFilters from './components/QuickFilters';
import './App.css';

function App() {
  const [savedFilters, setSavedFilters] = useState(() => {
    const saved = localStorage.getItem('savedFilters');
    return saved ? JSON.parse(saved) : [];
  });
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
  const [hybridDayPreference, setHybridDayPreference] = useState({
    monday: 'No Preference',
    tuesday: 'No Preference',
    wednesday: 'No Preference',
    thursday: 'No Preference',
    friday: 'No Preference',
    saturday: 'No Preference',
    sunday: 'No Preference'
  });  
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const stateMapping = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
    HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
    MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
    NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
    SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
    VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
  };

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
  };

  const handleDayAvailabilityChange = (day, status) => {
    setDayAvailability(prev => ({ ...prev, [day]: status }));
  };

  const handleHybridDayPreferenceChange = (day, type) => {
    setHybridDayPreference(prev => ({ ...prev, [day]: type }));
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredJobs = jobs.filter(job => {
    const { keyword, location, jobPreference, experience, minSalary, maxSalary, skills, startDate, endDate, topApplicant, hasVerifications, easyApply, fairChance } = filters;
  
    // Keyword filter
    if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase())) return false;
  
    // Location filter
    if (location) {
      const inputLocation = location.trim().toLowerCase();
      const jobLocation = job.location.toLowerCase();

      const locationParts = jobLocation.split(',').map(part => part.trim());
      const jobCity = locationParts[0];
      const jobState = locationParts[1]; 

      const stateMatch = Object.entries(stateMapping).find(([abbr, fullName]) => {
        return (
          inputLocation === abbr.toLowerCase() || inputLocation === fullName.toLowerCase()
        );
      });

      if (stateMatch) {
        const [matchedAbbr, matchedFullName] = stateMatch;
        const isMatch = 
          jobState === matchedAbbr.toLowerCase() || jobState === matchedFullName.toLowerCase();

        if (!isMatch) return false;
      } else {
        if (!jobCity.includes(inputLocation)) return false;
      }
    }
      
    // Job preference filter (on-site, remote, hybrid, all)
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
  
    // Day availability filter logic
    if (jobPreference === 'hybrid') {
      // Apply hybridDayPreference only if jobPreference is set to "hybrid"
      const days = Object.keys(hybridDayPreference);
      for (const day of days) {
        const userDayPref = hybridDayPreference[day];
        const jobDayType = job.schedule[day];
  
        // Only filter out if user is unavailable on a day the job actually requires
        if (userDayPref === 'Unavailable' && jobDayType) {
          return false;
        }
  
        // If user has a specific preference (Remote or On-Site) and job's schedule doesn't match, filter it out
        if (userDayPref !== 'No Preference' && jobDayType && userDayPref !== jobDayType) {
          return false;
        }
      }
    } else {
      // Apply dayAvailability for other job preferences ("on-site", "remote", "all")
      const days = Object.keys(dayAvailability);
      for (const day of days) {
        const userDayAvailability = dayAvailability[day];
        const jobDayRequirement = job.schedule[day];
  
        // If the user is unavailable on a required job day, filter it out
        if (userDayAvailability === 'unavailable' && jobDayRequirement) {
          return false;
        }
      }
    }
  
    // Other Preferences Filters
    if (topApplicant && !job.topApplicant) return false;
    if (hasVerifications && !job.verified) return false;
    if (easyApply && !job.easyApply) return false;
    if (fairChance && !job.fairChance) return false;
  
    return true;
  });
  
  

    // Save filter settings
    const handleSaveFilters = (filters, dayAvailability, hybridDayPreference) => {
      const filterName = prompt("Enter a name for this filter:", "My Filter");
  
      if (filterName) {
        const newFilter = { filterName, filters, dayAvailability, hybridDayPreference };
        const updatedSavedFilters = [...savedFilters, newFilter];
  
        setSavedFilters(updatedSavedFilters);
        localStorage.setItem('savedFilters', JSON.stringify(updatedSavedFilters));
      }
    };
  
    const handleApplySavedFilter = (savedFilter) => {
      setFilters(savedFilter.filters);
      setDayAvailability(savedFilter.dayAvailability);
      setHybridDayPreference(savedFilter.hybridDayPreference);
    };
  
    const handleDeleteSavedFilter = (filterName) => {
      const updatedFilters = savedFilters.filter(filter => filter.filterName !== filterName);
      setSavedFilters(updatedFilters);
      localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
    };
  
  
  
  return (
    <div className="App">
      <Header keyword={filters.keyword} location={filters.location} onFilterChange={handleFilterChange} />

      <div className="main-container">
        <QuickFilters
          filters={filters}
          dayAvailability={dayAvailability}
          hybridDayPreference={hybridDayPreference}
          onFilterChange={handleFilterChange}
          onDayAvailabilityChange={handleDayAvailabilityChange}
          onHybridDayPreferenceChange={handleHybridDayPreferenceChange}
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
              hybridDayPreference={hybridDayPreference}
              onFilterChange={handleFilterChange}
              onDayAvailabilityChange={handleDayAvailabilityChange}
              onHybridDayPreferenceChange={handleHybridDayPreferenceChange}
              onSaveFilters={handleSaveFilters}
              savedFilters={savedFilters}
              onApplySavedFilter={handleApplySavedFilter}
              onDeleteSavedFilter={handleDeleteSavedFilter}
              onCloseFilters={toggleFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;