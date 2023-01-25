import React, { useEffect, useState } from 'react';
import Spotify from '../utils/SpotifyPlayer';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
export default function Playlists(props) {
  const [items, setPlaylistName] = useState([]);
  const style = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gridGap: 'repeat(auto-fit, minmax(250px, 1fr))',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '1vw',
      textAlign: 'center',
      padding: '2rem',
      borderRadius: '1rem',
      // border: '100% solid white',
    },
  };

  useEffect(() => {
    spotifyApi.getUserPlaylists({ limit: 50 }).then(
      function (data) {
        console.log('Retrieved playlists', data.items);
        const items = data.items;

        setPlaylistName(items);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, [props.spotifyToken]);

  return (
    <>
      <div className="background" style={style.container}>
        {items &&
          items.map((playlistid, i) => (
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <h3> {playlistid.name}</h3>

              <h3>{playlistid.owner.display_name}</h3>

              <Spotify style={{ width: '' }} link={playlistid.external_urls.spotify} />
            </div>
          ))}
      </div>
    </>
  );
}
