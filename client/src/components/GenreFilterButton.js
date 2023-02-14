import React from 'react';
import SectionWrapper from './SectionWrapper';
export default function GenreFilterButton(props) {
  return (
    <div>
      <br></br>
      <SectionWrapper
        title="Top Genres"
        seeAllLink="/"
        titles="Top Artists"
        seeAllLinks="/artists"
        seeAllTracks="/tracks"
        titleTracks="Top Tracks"
        seeAllPlaylists="/playlists"
        titlePlaylists="Top Playlists"
        seeAllStarred="/starred"
        seeStarredTracks="Starred Tracks"
      />
      <h1 style={{ marginTop: '-1.75em' }}>{props.timeRangeText} -- User Genres</h1>
      {props.genre
        .map((option, index) => (
          <>
            <form
              key={option.index}
              style={{
                display: 'inline',
                margin: '10px',
                padding: '10px',
                fontSize: '18px',
                backgroundColor: 'black',
                borderRadius: '10px',
              }}
              onSubmit={props.searchArtists}
            >
              <button
                key={option.index}
                style={{
                  padding: '10px',
                  color: 'white',
                  justifyContent: 'center',
                  fontSize: '16px',
                  width: '200px',
                  margin: '8px',
                  marginTop: '.5rem',
                  boxShadow: '1px 2px 5px 1px white',
                  backgroundColor: 'black',
                  border: '2px solid white',
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
