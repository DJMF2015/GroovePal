import React, { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useNavigate } from 'react-router-dom';
import CreatePlaylistButton from './CreatePlaylistBtn';
import TimeRangeButton from '../components/TimeRangeButton';
import SectionWrapper from './SectionWrapper';
import TrackList from './TrackList';
import useToggleTimeRange from '../hooks/useTimeRange';
const spotifyApi = new SpotifyWebApi();

const styles = {
  button: {
    color: 'white',
    margin: '1em 2em 2em -5em',
    backgroundColor: 'black',
    padding: '1rem',
    width: '10rem',
    font: 'Roboto',
    fontSize: '1rem',
    borderRadius: '5rem',
    border: '1px solid white',
  },
};
const TracksButton = ({ setTracks, createTopTracksPlaylist }) => {
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [tracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        },
      }
    );
    setLoading(true);
    const data = await res.json();
    setTopTracks(data.items);
    setTracks(data.items);
    setLoading(false);
  }, [access_token, setTracks, timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (tracks.length === 0) {
    return <p>Sorry not enough data....</p>;
  }
  return (
    <>
      <TimeRangeButton onClick={toggleTimeRange} timeRangeText={timeRangeText} />
      <br></br>
      <br></br>
      <button style={styles.button} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <CreatePlaylistButton onClick={createTopTracksPlaylist} />
      <main>
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
        >
          <TrackList tracks={tracks} />
        </SectionWrapper>
      </main>
    </>
  );
};
export default TracksButton;
