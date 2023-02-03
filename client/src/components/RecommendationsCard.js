import React, { useState } from 'react';
import SpotifyPreview from '../utils/SpotifyPreview';
import TodayDate from '../utils/Date';
import CreatePlaylistButton from './CreatePlaylistBtn';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const RecommendationsCard = ({ artistData }) => {
  const [playlistName, setPlaylistName] = useState(`Discover - ${TodayDate()}`);

  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();

    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: `${me.display_name} Recommendations - ${TodayDate()}  `,
    });

    const playlists = await spotifyApi.getUserPlaylists(me.id);

    const existingPlaylist = await playlists.items.find((p) => p.name === playlistName);
    let trackUris = [];
    artistData.tracks.map((track, i) => {
      return trackUris.push(track.uri);
    });

    await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris, {
      position: 0,
    });
  };
  return (
    <div className="background">
      {artistData ? (
        <h1 style={{ textAlign: 'center', color: 'red', marginTop: '-4rem' }}>
          Recommendations
        </h1>
      ) : (
        ''
      )}

      <CreatePlaylistButton onClick={createTopTracksPlaylist} />

      {artistData?.tracks &&
        artistData?.tracks.map((track, i) => (
          <>
            <p> {track?.name}</p>
            <SpotifyPreview
              style={{ border: '1px solid black', width: '400px' }}
              link={track.external_urls?.spotify}
            />
          </>
        ))}
    </div>
  );
};
export default RecommendationsCard;
