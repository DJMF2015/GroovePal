import React, { useState } from 'react';
import SpotifyPreview from '../utils/SpotifyPreview';
import TodayDate from '../utils/Date';
import CreatePlaylistButton from './CreatePlaylistBtn';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const style = {
  rangeButtons: {
    // display: 'inline',
    alignItems: 'center',
    margin: '25px 25px 20px 8px',
    padding: '3px 0px 0px 0px',
  },
};
const RecommendationsCard = (props) => {
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
    props.artistData.tracks.map((track, i) => {
      return trackUris.push(track.uri);
    });

    await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris, {
      position: 0,
    });
  };

  return (
    <div className="background">
      {!props.artistData ? (
        <>
          <h1 style={{ textAlign: 'center', color: 'red', marginTop: '0rem' }}>
            No Recommendations
          </h1>
        </>
      ) : (
        <>
          <div style={{ marginTop: '0rem' }}>
            <h1>Recommendations</h1>
            <CreatePlaylistButton onClick={createTopTracksPlaylist} />
          </div>
          <div style={style.rangeButtons}>
            <label style={{ margin: '2em' }}>Popularity </label>

            <input
              type="range"
              name="popularity"
              min="0"
              max="100"
              onChange={(e) => {
                props.handlePopularityChange(e.target.value);
              }}
            />

            <label style={{ margin: '2em' }}>Instrumentalness</label>
            <input
              type="range"
              min="0"
              name="instrumentalness"
              max="0.9"
              step="0.01"
              onChange={(e) => {
                props.handleInstrumentalChange(e.target.value);
              }}
            />
            <label style={{ margin: '2em' }}>Energy</label>
            <input
              type="range"
              min="0"
              name="energy"
              max="0.9"
              step="0.01"
              onChange={(e) => {
                props.handleEnergyChange(e.target.value);
              }}
            />
            <label style={{ margin: '2em' }}>Danceability</label>
            <input
              type="range"
              min="0"
              name="danceability"
              max="0.9"
              step="0.01"
              onChange={(e) => {
                props.handleDanceabilityChange(e.target.value);
              }}
            />
          </div>
        </>
      )}

      {props.artistData?.tracks &&
        props.artistData?.tracks.map((track, i) => (
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
