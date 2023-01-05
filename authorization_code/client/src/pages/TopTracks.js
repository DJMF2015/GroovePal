import React, { useState, useEffect } from 'react';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
import Spotify from '../utils/Spotify';
import SpotifyPreview from '../utils/SpotifyPreview';
import axios from 'axios';
const spotifyApi = new SpotifyWebApi();

const TopTracks = () => {
  // const [preview, setPreview] = useState([]);
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');
  const [timeRangeText, setTimeRangeText] = useState('');
  const [playlistName, setPlaylistName] = useState(`Top Tracks - ${TodayDate()}`);

  useEffect(() => {
    const getTopAllTimeTracks = async () => {
      const baseUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`;
      const topTracks = [];
      let lastResult = [];

      try {
        const response = await axios.get(`${baseUrl}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
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
  }, [timeRange]);

  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();

    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: `Top Tracks ${timeRangeText} `,
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
        <div>
          <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '0 1rem',
              marginTop: '1rem',
              border: '2px solid white',
              borderRadius: '10rem',
              padding: '1rem',
            }}
            onClick={() => setTimeRange('long_term')}
          >
            {timeRangeText}
            All Time
          </button>
          <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '0 1rem',
              border: '2px solid white',
              borderRadius: '10rem',
              padding: '1rem',
            }}
            onClick={() => setTimeRange('medium_term')}
          >
            {timeRangeText} Last 6 Months
          </button>
          <button
            style={{
              backgroundColor: 'black',
              margin: '0 1rem',
              color: 'white',
              border: '2px solid white',
              borderRadius: '10rem',
              padding: '1rem',
            }}
            onClick={() => setTimeRange('short_term')}
          >
            {timeRangeText} Last 4 Weeks
          </button>
        </div>
        {data.map((track, i) => {
          return (
            <>
              <p key={i}>Album: {data[i].album.name}</p>
              <p>Track: {track.name}</p>
              <p>Popularity: {data[i].popularity}</p>
              <img
                style={{
                  display: 'block',
                  margin: '10px auto',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '5rem',
                  border: '2px solid white',
                }}
                src={data[i].album.images[0].url}
                alt="album art"
              />
              {/* <audio
                style={{
                  backgroundColor: 'darkred',
                  padding: '0.5rem',
                  border: '2px solid white',
                  borderRadius: '10rem',
                }}
                key={i}
                controls
                name="media"
              >
                <source src={track.preview_url} type="audio/mp3" />
              </audio> */}

              <SpotifyPreview link={track.external_urls.spotify} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default TopTracks;
