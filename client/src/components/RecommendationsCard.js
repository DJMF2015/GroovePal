import React, { useState } from 'react';
import SpotifyPreview from '../utils/SpotifyPreview';
import TodayDate from '../utils/Date';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const RecommendationsCard = (props) => {
  const [playlistName, setPlaylistName] = useState(`Discover - ${TodayDate()}`);

  const createTopTracksPlaylist = async () => {
    let me = await spotifyApi.getMe();

    await spotifyApi.createPlaylist(me.id, {
      name: playlistName,
      public: true,
      description: `${me.display_name} Top Tracks  `,
    });

    const playlists = await spotifyApi.getUserPlaylists(me.id);

    const existingPlaylist = await playlists.items.find((p) => p.name === playlistName);
    let trackUris = [];
    props.artistData.tracks.map((track, i) => {
      return trackUris.push(track.uri);
    });

    await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris, {
      position: 0,
    });
  };
  return (
    <div className="background">
      <h1 style={{ textAlign: 'center', color: 'red' }}>Recommendations</h1>
      <button
        const
        style={{
          display: 'inline-flex',
          padding: '0.5rem 2rem',
          margin: '1rem auto',
          marginLeft: '80vw',
          backgroundColor: 'green',
          color: 'black',
          font: 'Roboto',
          fontSize: '1rem',
          border: '3px solid black',
          borderRadius: '10rem',
        }}
        onClick={createTopTracksPlaylist}
      >
        Create Playlist
      </button>
      {props.artistData?.tracks &&
        props.artistData?.tracks.map((track, i) => (
          <>
            <p> {track?.name}</p>
            <p>popularity: {track?.popularity}</p>
            <SpotifyPreview link={track.external_urls?.spotify} />
          </>
        ))}
    </div>
  );
};
export default RecommendationsCard;
