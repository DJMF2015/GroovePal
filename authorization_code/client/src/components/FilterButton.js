import React from 'react';

export default function GenreFilterButton(props) {
  return (
    <div>
      {props.genre
        .map((option, index) => (
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
              border: '3px solid red',
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
              {index + 1} {option[0]}
            </button>
          </form>
        ))
        .slice(0, 30)}
    </div>
  );
}
