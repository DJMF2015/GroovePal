import React, { useState, useEffect } from 'react';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
import Spotify from '../utils/Spotify';
import SpotifyPreview from '../utils/SpotifyPreview';
import axios from 'axios';
const spotifyApi = new SpotifyWebApi();

const TopTracks = () => {
  const [toptracks, setTopTracks] = useState([]);
  const [preview, setPreview] = useState([]);
  const [data, setData] = useState([]);
  const [artist, setArtists] = useState([]);
  const [playlistName, setPlaylistName] = useState(
    `David's All Time Top Tracks ${TodayDate()} `
  );
  // useEffect(() => {
  //   const handleGetTopTracks = () => {
  //     spotifyApi.getMyTopTracks({ limit: 50, offset: 49, time_range: 'long_term' }).then(
  //       function (data) {
  //         let all = data.items.map((item) => item);

  //         setData(all);
  //       },
  //       function (err) {
  //         console.log('Something went wrong!', err);
  //       }
  //     );
  //   };

  //   handleGetTopTracks();
  // }, []);
  useEffect(() => {
    const getTopAllTimeTracks = async () => {
      let offset = 0;

      const baseUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term';
      const topTracks = [];
      let lastResult = [];

      try {
        const response = await axios.get(`${baseUrl}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
          params: {
            limit: 50,
            offset: offset,
          },
        });

        // setLoading(true);
        const data = await response.data;
        lastResult = data;
        lastResult.items.forEach((item) => {
          topTracks.push(item);
        });
        while (lastResult.next !== null) {
          offset += 50;
          getTopAllTimeTracks();
        }

        // increment offset by 50
      } catch (error) {
        console.log(error);
      }
      // while (
      //   lastResult.next !== null &&
      //   lastResult.next !== undefined &&
      //   lastResult.next !== '' &&
      //   offset < 200
      // );
      setData(topTracks);
      // setLoading(false);
    };
    getTopAllTimeTracks();
  }, []);

  const getRecentlyPlayed = () => {
    // Get Current User's Recently Played Tracks
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 20,
      })
      .then(
        function (data) {
          // Output items
          console.log('Your 20 most recently played tracks are:');
          let all = data;
          console.log({ all });
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  };
  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();
    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: 'All Time Top Tracks',
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
        <button onClick={getRecentlyPlayed}>Recently Played</button>
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
