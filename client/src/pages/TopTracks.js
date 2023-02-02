import React, { useState } from 'react';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
import CreatePlaylistButton from '../components/CreatePlaylistBtn';
import TopTracksButton from '../components/TopTracksButton';
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
        <div
          className="tooltip"
          style={{
            margin: '10px 15px',
            border: '3px solid black',
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: '1px 8px',
            color: 'black',
          }}
        >
          &#33;
          <span className="tooltiptext">
            {' '}
            Select Create Playlist to save all top tracks to your Spotify account
          </span>
        </div>

        <CreatePlaylistButton onClick={createTopTracksPlaylist} />
        <TopTracksButton setTracks={setTracks} />
      </div>
    </>
  );
};

export default TopTracks;
