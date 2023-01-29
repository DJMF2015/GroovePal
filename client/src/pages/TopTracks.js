import React, { useState } from 'react';
import TodayDate from '../utils/Date';
import styled from 'styled-components/macro';
import SpotifyWebApi from 'spotify-web-api-js';
import TracksButton from '../components/TopTracksButton';
const spotifyApi = new SpotifyWebApi();

const TopTracks = () => {
  const [playlistName, setPlaylistName] = useState(`Top Tracks - ${TodayDate()}`);
  const [tracks, setTracks] = useState([]);

  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();

    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: `${me.display_name} David's Top Tracks - ${TodayDate()}`,
    });

    const playlists = await spotifyApi.getUserPlaylists(me.id);

    const existingPlaylist = await playlists.items.find((p) => p.name === playlistName);
    let trackUris = [];
    tracks.map((track, i) => {
      return trackUris.push(track.uri);
    });

    await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris, { position: 0 });
  };

  return (
    <>
      <div className="background">
        <button
          const
          style={{
            display: 'flex',
            margin: '10px auto',
            marginTop: '0rem',
            backgroundColor: '#1DB954',
            color: 'black',
            font: 'Roboto',
            fontSize: '1rem',
            border: '3px solid white',
            borderRadius: '10rem',
          }}
          onClick={createTopTracksPlaylist}
        >
          Create Playlist
        </button>

        <TracksButton setTracks={setTracks} />
      </div>
    </>
  );
};

export default TopTracks;
