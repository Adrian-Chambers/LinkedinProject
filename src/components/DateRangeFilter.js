// src/components/DateRangeFilter.js
import React from 'react';

function DateRangeFilter({ startDate, endDate, onChange }) {
  return (
    <div className="date-posted-row">
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      <span className="to-text">to</span>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    </div>
  );
}

export default DateRangeFilter;
