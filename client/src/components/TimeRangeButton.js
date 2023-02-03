import * as React from 'react';
import StyledTimeRange from '../styles/StyledTimeRange';
const TimeRangeButton = ({ timeRangeText, onClick }) => {
  return (
    <>
      <StyledTimeRange>
        <li>
          <div
            className="tooltip"
            style={{ fontSize: '22px', position: 'absolute', left: '2rem' }}
          >
            &#x24D8;
            <span className="tooltiptext">
              Toggle between short, medium & long term time ranges
            </span>
          </div>
          <button onClick={onClick}>{timeRangeText}</button>
        </li>
      </StyledTimeRange>
    </>
  );
};
export default TimeRangeButton;
