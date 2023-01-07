import React from 'react';
import Spotify from '../utils/SpotifyPlayer';
export default function Artists(props) {
  return props.artists

    .map((artist, i) => (
      <>
        <div key={artist.id}>
          <p style={{ margin: '0px', fontSize: '28px', padding: '0.5em' }}>
            {' '}
            {artist.name}
          </p>

          <br></br>
          <Spotify link={artist.external_urls.spotify} />
        </div>
      </>
    ))
    .slice(0, 1);
}
