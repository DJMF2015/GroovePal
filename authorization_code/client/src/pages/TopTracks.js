import React, { useState, useEffect } from 'react';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
import TracksButton from '../components/TracksButton';
import axios from 'axios';
const spotifyApi = new SpotifyWebApi();

const TopTracks = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');
  const [timeRangeText, setTimeRangeText] = useState('');
  const [playlistName, setPlaylistName] = useState(`David's Top Tracks - ${TodayDate()}`);
  const access_token = spotifyApi.getAccessToken();
  useEffect(() => {
    const getTopAllTimeTracks = async () => {
      const baseUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`;
      const topTracks = [];
      let lastResult = [];

      try {
        const response = await axios.get(`${baseUrl}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            limit: 30,
            offset: 0,
            time_range: timeRange,
          },
        });

        const data = await response.data;
        lastResult = data;
        lastResult.items.forEach((item) => {
          topTracks.push(item);
          setData(topTracks);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getTopAllTimeTracks();
  }, [timeRange, access_token]);

  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();

    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: `David's Top Tracks - ${TodayDate()}`,
    });

    const playlists = await spotifyApi.getUserPlaylists(me.id);

    const existingPlaylist = await playlists.items.find((p) => p.name === playlistName);
    let trackUris = [];
    data.map((track, i) => {
      return trackUris.push(track.uri);
    });

    await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris, { position: 0 });
  };

  return (
    <>
      <div className="background">
        <h2>All Time Top Tracks</h2>
        <button onClick={createTopTracksPlaylist}>Create Top Tracks Playlist</button>
        <TracksButton />
      </div>
    </>
  );
};

export default TopTracks;
