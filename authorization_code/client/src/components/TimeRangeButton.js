import * as React from 'react';

const TimeRangeButton = ({ timeRangeText, onClick, style }) => {
  style = {
    marginLeft: '30vw',
    backgroundColor: 'black',
    color: 'white',
    margin: '0 auto',
    display: 'block',
    marginTop: '1rem',
    border: '2px solid white',
    borderRadius: '10rem',
    padding: '1rem',
  };
  return (
    <button onClick={onClick} style={style}>
      {timeRangeText}
    </button>
  );
};
export default TimeRangeButton;
