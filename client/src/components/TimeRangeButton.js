import * as React from 'react';
import StyledTimeRange from '../styles/StyledTimeRange';
const TimeRangeButton = ({ timeRangeText, onClick, style }) => {
  return (
    <>
      <StyledTimeRange>
        <li>
          <button onClick={onClick}>{timeRangeText}</button>
        </li>
      </StyledTimeRange>
    </>
  );
};
export default TimeRangeButton;
