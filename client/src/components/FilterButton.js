import React from 'react';
import styled from 'styled-components';
export default function GenreFilterButton(props) {
  return (
    <div>
      <StyledInputField
        type="text"
        onBeforeInput={(e) => props.renderSearch(e.target.value)}
        placeholder="Search Artist"
      />

      {props.genre
        .map((option, index) => (
          <>
            <form
              key={option.index}
              style={{
                display: 'inline',
                margin: '10px',
                justifyContent: 'center',
                padding: '9px',
                width: '100px',
                height: '60px',
                fontSize: '18px',
                backgroundColor: 'ghostwhite',
                borderRadius: '10px',
              }}
              onSubmit={props.searchArtists}
            >
              <button
                key={option.index}
                style={{
                  padding: '5px',
                  fontSize: '16px',
                  margin: '10px',
                  marginTop: '1rem',
                  backgroundColor: 'ghostwhite',
                  border: '1px solid white',
                }}
                id={option}
                value={option[0]}
                type="submit"
                onClick={(e) => props.renderGenre(e.target.value)}
              >
                {`${index + 1}: ${option[0].charAt(0).toUpperCase()}${option[0].slice(
                  1
                )}`}
              </button>
            </form>
          </>
        ))
        .slice(0, 20)}
    </div>
  );
}

const StyledInputField = styled.input`
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  margin: 20px 0 40px 40px;
  width: 12rem;
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
    width: 75%;
    background-color: ghostwhite;
    box-shadow: 10px 5px 15px 10px grey;
  }
`;
