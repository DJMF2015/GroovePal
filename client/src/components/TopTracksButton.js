import React, { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import TimeRangeButton from '../components/TimeRangeButton';
import SectionWrapper from './SectionWrapper';
import TrackList from './TrackList';
import useToggleTimeRange from '../hooks/useTimeRange';
const spotifyApi = new SpotifyWebApi();
const TracksButton = ({ setTracks }) => {
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [tracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);
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
