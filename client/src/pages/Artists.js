import React from 'react';
import { Link } from 'react-router-dom';
export default function Artists(props) {
  return props.playlist

    .map((playlist, i) => (
      <>
        <div key={playlist.id}>
          <p style={{ margin: '0px', fontSize: '28px', padding: '.5em' }}> </p>

          <br></br>

          <Link to={`/playlists/${playlist.id}`} state={{ from: playlist }}>
            <img src={playlist.images[0].url} alt="playlist" style={{ width: '100px' }} />
          </Link>
        </div>
      </>
    ))
    .slice(0, 3);
}
