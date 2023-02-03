import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    width: '10%',
    marginTop: '4rem',
    listStyle: 'none',
    margin: '5em 0.5em 0em 1em',
    padding: '.1em',
    display: 'inline-flex',
    minWidth: '10em',
  },

  para: {
    textAlign: 'left',
    display: 'inline-flex',
    fontSize: '1rem',
    flex: 'wrap',
    margin: '0.9rem 0.25rem 0.25rem 0rem',
    FontFace: 'Roboto',
  },
};
export default function Artists(props) {
  const formattedPlaylistName = (playlistName) => {
    const name = playlistName.slice(0, 20).concat('...');
    return name;
  };

  return props.playlist

    .map((playlist, i) => (
      <>
        <div style={styles.container} key={playlist.id}>
          <br></br>

          <Link
            to={`/playlists/${playlist.id}`}
            style={{ textDecoration: 'none' }}
            state={{ from: playlist }}
          >
            <img src={playlist.images[0].url} alt="playlist" />
            <p style={styles.para}>{formattedPlaylistName(playlist.name)}</p>
          </Link>
        </div>
      </>
    ))
    .slice(0, 20);
}
