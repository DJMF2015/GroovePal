import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
const spotifyApi = new SpotifyWebApi();
const TimeRangeButton = () => {
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
  const getUserTopTracks = () => {
    // Get Current User's Recently Played Tracks
    spotifyApi
      .getMyTopTracks({
        limit: 30,
        time_range: timeRange,
      })
      .then(
        function (data) {
          // Output items
          console.log('Your 20 most recently played tracks are:');

          setTopTracks(data.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  };

  useEffect(() => {
    getUserTopTracks();
  }, [timeRange]);
  return (
    <>
      <div className="time-range-buttons">
        <button style={styles.button} onClick={() => setTimeRange('short_term')}>
          Short Term
        </button>
        <button style={styles.button} onClick={() => setTimeRange('medium_term')}>
          Medium Term
        </button>
        <button style={styles.button} onClick={() => setTimeRange('long_term')}>
          Long Term
        </button>
      </div>

      {tracks && access_token ? (
        tracks.map((track, i) => {
          return (
            <>
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
export default TimeRangeButton;
