import React, { useState, useEffect } from 'react';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const useCreatePlaylist = (props) => {
  const [playlistName, setPlaylistName] = useState(`Discover - ${TodayDate()}`);

  return {
    createTopTracksPlaylist: async () => {
      let me = await spotifyApi.getMe();

      await spotifyApi.createPlaylist(me.id, {
        name: playlistName,
        public: true,
        description: `${me.display_name} Recommendations - ${TodayDate()}  `,
      });

      const playlists = await spotifyApi.getUserPlaylists(me.id);

      const existingPlaylist = await playlists.items.find((p) => p.name === playlistName);
      let trackUris = [];
      props.tracks.map((track, i) => {
        return trackUris.push(track.uri);
      });

      await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris, {
        position: 0,
      });
    },
  };
};
export default useCreatePlaylist;
