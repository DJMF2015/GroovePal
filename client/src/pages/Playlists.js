import React, { useEffect, useState } from 'react';
import { SectionWrapper } from '../components';
import Spotify from '../utils/SpotifyPlayer';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
export default function Playlists(props) {
  const [items, setPlaylistName] = useState([]);
  const style = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gridGap: 'repeat(auto-fit, minmax(100px, 1fr))',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '3vw',
      textAlign: 'center',
      padding: '2rem',
      borderRadius: '1rem',
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
      <div className="background" style={style.container}>
        {items &&
          items.map((playlist, i) => (
            <div style={{ margin: '1px auto', textAlign: 'center' }}>
              {/* <h3> {playlist.name}</h3> */}

              <Link
                to={`/playlists/${playlist.id}`}
                state={{ from: playlist }}
                key={playlist.id}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={playlist.images[0].url}
                  alt="playlist"
                  style={{ width: '150px', margin: '10px auto' }}
                />
              </Link>

              {/* <Spotify style={{ width: '' }} link={playlist.external_urls.spotify} /> */}
            </div>
          ))}
      </div>
    </>
  );
}
