import styled from 'styled-components';
import React from 'react';

export default function SearchBar(props) {
  return (
    <>
      {/* <h1 style={{ fontFamily: 'Arial' }}>Top Genres</h1> */}
      <StyledInputField
        type="text"
        onBeforeInput={(e) => props.renderSearch(e.target.value)}
        placeholder="Search Track..."
      />
    </>
  );
}

const StyledInputField = styled.input`
  display: flex;
  margin: 1em 0em 1em 5em;
  width: 14rem;
  box-sizing: border-box;
  border: 2px solid white;
  border-radius: 20px;
  font-size: 16px;
  font: 'Roboto', sans-serif;
  background-color: ghostwhite;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;

  &:focus {
    width: 50%;
    background-color: ghostwhite;
    box-shadow: 10px 5px 15px 10px grey;
  }
`;
