import React, { useState } from 'react';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
import TopTracksButton from '../components/TopTracksButton';
const spotifyApi = new SpotifyWebApi();

const TopTracks = () => {
  const [playlistName, setPlaylistName] = useState(`Top Tracks - ${TodayDate()}`);
  const [tracks, setTracks] = useState([]);

  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();
    console.log({ me });
    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: `${me.display_name}'s Top Tracks - ${TodayDate()}`,
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
        <TopTracksButton
          setTracks={setTracks}
          createTopTracksPlaylist={createTopTracksPlaylist}
        />
      </div>
    </>
  );
};

export default TopTracks;
