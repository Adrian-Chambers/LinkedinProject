// src/components/DayAvailabilityFilter.js
import React from 'react';

function AvailabilityFilter({ dayAvailability, hybridDayPreference, jobPreference, onDayAvailabilityChange, onHybridDayPreferenceChange }) {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
    return (
      <div className="day-availability">
        <h3>Day Availability</h3>
        {daysOfWeek.map(day => (
          <div key={day} className="day-availability-item">
            <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
            {jobPreference === 'hybrid' ? (
              <select
                id={day}
                value={hybridDayPreference[day]}
                onChange={(e) => onHybridDayPreferenceChange(day, e.target.value)}
              >
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
                <option value="No Preference">No Preference</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            ) : (
              <select
                id={day}
                value={dayAvailability[day]}
                onChange={(e) => onDayAvailabilityChange(day, e.target.value)}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            )}
          </div>
        ))}
      </div>
    );
  }

export default AvailabilityFilter;
