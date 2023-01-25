import React, { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
import TimeRangeButton from '../components/TimeRangeButton';
import useToggleTimeRange from '../hooks/useTimeRange';
const spotifyApi = new SpotifyWebApi();
const TracksButton = ({ setTracks }) => {
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [tracks, setTopTracks] = useState([]);
  const access_token = spotifyApi.getAccessToken();

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
      <TimeRangeButton onClick={toggleTimeRange} timeRangeText={timeRangeText} />

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
                  // display: 'block',
                  // margin: '10px auto',
                  margin: '0 auto',
                  position: 'relative',
                  top: '-10%',
                  left: '50%',
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
