// src/components/DayAvailabilityFilter.js
import React from 'react';

function AvailabilityFilter({ dayAvailability, onDayAvailabilityChange }) {
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="day-availability">
      {daysOfWeek.map(day => (
        <div key={day} className="day-availability-item">
          <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
          <select
            id={day}
            value={dayAvailability[day]}
            onChange={(e) => onDayAvailabilityChange(day, e.target.value)}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AvailabilityFilter;
