import React, { useEffect, useState } from 'react';
import Spotify from '../utils/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
export default function Playlists(props) {
  const [items, setPlaylistName] = useState([]);

  useEffect(() => {
    spotifyApi.getUserPlaylists({ limit: 30 }).then(
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
  console.log({ items });
  return (
    <>
      <div className="background">
        {items &&
          items.map((playlistid, i) => (
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <h3> {playlistid.name}</h3>

              <h3>{playlistid.owner.display_name}</h3>

              <Spotify style={{ width: '90%' }} link={playlistid.external_urls.spotify} />
            </div>
          ))}
      </div>
    </>
  );
}
