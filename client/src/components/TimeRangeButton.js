import * as React from 'react';
import styled from 'styled-components';
const StyledRangeButtons = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0 0 24px 0;
  padding: 0;
  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    right: var(--spacing-xxl);
    margin-bottom: 0;
    li {
      margin-right: 8px;
      @media (min-width: 768px) {
        margin-left: 8px;
        margin-right: 0;
      }
      button {
        background-color: #282828;
        &:hover,
        &:focus {
          background-color: #535353;
        }
        &.active {
          background-color: #1db954;
        }
      }
    }
  }
`;

const TimeRangeButton = ({ timeRangeText, onClick, style }) => {
  style = {
    marginLeft: '30vw',
    // display: 'inline-block',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    padding: '1rem',
    color: 'white',
    font: 'Roboto',
    fontSize: '1rem',
    margin: '0 auto',
    // display: 'block',
    postion: 'absolute',
    border: '3px solid white',
    borderRadius: '10rem',
  };
  return (
    <>
      <button style={style} onClick={onClick}>
        {timeRangeText}
      </button>
    </>
  );
};
export default TimeRangeButton;
