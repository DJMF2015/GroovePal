import * as React from 'react';

export default function CreatePlaylistBtn({ onClick }) {
  const styles = {
    marginTop: '2rem',
    width: '50%',
    padding: '1rem',
    backgroundColor: '#1DB954',
    color: 'black',
    font: 'Roboto',
    fontSize: '1rem',
    border: '3px solid black',
    borderRadius: '10rem',
  };
  return (
    <>
      <div className="tooltip" style={{ fontSize: '22px' }}>
        &#x24D8;
        <span className="tooltiptext">
          Select Create Playlist to save tracks to Spotify account
        </span>
      </div>
      <button onClick={onClick} style={styles}>
        Create Playlist
      </button>
    </>
  );
}
