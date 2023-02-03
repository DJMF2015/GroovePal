import React, { useState } from 'react';
export default function useToggleTimeRange() {
  const [timeRange, setTimeRange] = useState('long_term');
  const [timeRangeText, setTimeRangeText] = useState('All Time');
  // custom hook to handle time range state between components
  const toggleTimeRange = () => {
    if (timeRange === 'long_term') {
      setTimeRange('medium_term');
      setTimeRangeText('Last 6 Months');
    } else if (timeRange === 'medium_term') {
      setTimeRange('short_term');
      setTimeRangeText('Last 4 Weeks');
    } else if (timeRange === 'short_term') {
      setTimeRange('long_term');
      setTimeRangeText('All Time');
    }
  };

  return { timeRange, timeRangeText, toggleTimeRange };
}
