import React, { useEffect, useState } from 'react';
import { SectionWrapper } from '../components';
import BackButton from '../components/BackButton';
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
        const items = data.items;

        setPlaylistName(items);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, [props.spotifyToken]);
  if (items.length === 0)
    return (
      <>
        <h2 style={{ textAlign: 'center', fontSize: '28px' }}>
          Sorry. Seems like you have no saved playlists &#128577;
        </h2>
        <BackButton />
      </>
    );

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
      <BackButton />
      <div className="background" style={style.container}>
        {items &&
          items.map((playlist, i) => (
            <div style={{ margin: '1px auto', textAlign: 'center' }}>
              <Link
                to={`/playlists/${playlist.id}`}
                state={{ from: playlist }}
                key={playlist.id}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={playlist.images[0].url ? playlist.images[0].url : ''}
                  alt={playlist.name}
                  style={{ width: '150px', margin: '10px auto' }}
                />
                <div className="tooltip" style={{ fontSize: '22px', left: '10px' }}>
                  &#x24D8;
                  <span className="tooltiptext">{playlist.name}</span>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
