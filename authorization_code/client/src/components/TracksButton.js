import React, { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
const spotifyApi = new SpotifyWebApi();
const TracksButton = ({ setTracks }) => {
  const [timeRange, setTimeRange] = useState('long_term');

  const [tracks, setTopTracks] = useState([]);
  const access_token = spotifyApi.getAccessToken();

  const styles = {
    button: {
      backgroundColor: 'black',
      margin: '0 1rem',
      color: 'white',
      border: '2px solid white',
      borderRadius: '10rem',
      padding: '1rem',
    },
  };

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit: 50,
          offset: 0,
          time_range: timeRange,
        },
      }
    );

    const data = await res.json();
    setTopTracks(data.items);
    setTracks(data.items);
  }, [access_token, setTracks, timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>
        <button style={styles.button} onClick={() => setTimeRange('long_term')}>
          Long Term
        </button>
        <button style={styles.button} onClick={() => setTimeRange('medium_term')}>
          Medium Term
        </button>
        <button style={styles.button} onClick={() => setTimeRange('short_term')}>
          Short Term
        </button>
      </div>

      {tracks && access_token ? (
        tracks.map((track, i) => {
          return (
            <>
              {/* <p>{i + 1}</p> */}
              <p key={i}>Album: {track.album.name}</p>
              <p>Track: {track.name}</p>
              <p>Popularity: {track.popularity}</p>
              <img
                style={{
                  display: 'block',
                  margin: '10px auto',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '5rem',
                  border: '2px solid white',
                }}
                src={track.album.images[0].url}
                alt="album art"
              />
              <SpotifyPreview link={track.external_urls.spotify} />
            </>
          );
        })
      ) : (
        <a href="http://localhost:8888/login">Log in to Spotify</a>
      )}
    </>
  );
};
export default TracksButton;
