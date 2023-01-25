import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '.5rem',
    gridAutoRows: 'minmax(100px, auto)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2vw',
    textAlign: 'center',
    padding: '0rem',
    borderRadius: '1rem',
    border: '1px solid white',
  },
};
const RelatedArtist = (props) => {
  const genres = props?.artist.genres.map((genre, i) => {
    const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
    return (
      <>
        <p>{formattedGenre}</p>
      </>
    );
  });
  return (
    <>
      <div style={styles.container}>
        <p>
          {' '}
          <h4>Artist</h4>
          {props?.artist.name}
        </p>
        <p>
          {' '}
          <h4>Popularity</h4>
          {props?.artist.popularity}
        </p>
        <p>
          {' '}
          <h4>Genres</h4>
          {genres}
        </p>
        <a
          style={{ textDecoration: 'none' }}
          href={props.artist.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
        >
          {props?.artist.name} Profile
        </a>
        <img
          style={{
            border: '1px solid white',
            borderRadius: '1rem',
            margin: '0 auto',
            justifyContent: 'center',
          }}
          src={props?.artist.images[2].url}
          alt="artist profile"
        />
      </div>
    </>
  );
};
export default RelatedArtist;
