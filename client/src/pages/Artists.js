import React from 'react';
import Spotify from '../utils/SpotifyPlayer';
export default function Artists(props) {
  console.log({ props });
  return props.playlist

    .map((playlist, i) => (
      <>
        <div key={playlist.id}>
          <p style={{ margin: '0px', fontSize: '28px', padding: '.5em' }}>
            {' '}
            {playlist.name}
          </p>

          <br></br>
          <Spotify
            style={{ width: '75%', height: '600px' }}
            link={playlist.external_urls.spotify}
          />
        </div>
      </>
    ))
    .slice(0, 1);
}
