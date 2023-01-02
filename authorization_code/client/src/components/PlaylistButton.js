import React, { useState, useEffect } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
export default function PlaylistWidget(props) {
  const [name, setName] = useState([]);
  // const [description, setDescription] = useState([]);
  console.log(props);

  const createPlaylist = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${props.profile.id}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${props.spotifyToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: props.profile.display_name + ' ' + 'Xmas 2022',
          description: 'Christmas playlist',
          public: true,
        }),
      }
    );
    console.log({ response });
    // window.location('/');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // createPlaylist();
  };
  // https://api.spotify.com/v1/playlists/{playlist_id}/tracks
  const addTracksToPlaylist = async () => {
    if (!props.playlist || !props.spotifyTrack || props.tracks.length === 0) {
      // return;
      alert(props.profile.display_name + ' please select a genre ');
    } else {
      spotifyApi.addTracksToPlaylist(props.playlist, props.spotifyTrack).then(
        function (data) {
          console.log('Added tracks to playlist!', data);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'inline',
          margin: '10px',
          justifyContent: 'center',
          padding: '20px',
          width: '100px',
          height: '60px',
          fontSize: '18px',
          backgroundColor: 'ghostwhite',
          border: '2px solid blue',
          borderRadius: '10px',
        }}
      >
        {/* <input
          style={{ margin: '20px' }}
          type="text"
          placeholder="Add Playlist Name"
          onChange={(e) => setName(e.target.value)}
        /> */}

        <button
          // key={name}
          style={{
            padding: '10px',
            fontSize: '16px',
            margin: '10px',
            marginTop: '1rem',
            backgroundColor: 'blue',
            border: '1px solid white',
          }}
          // id={name}
          type="submit"
          onClick={createPlaylist}
        >
          Create Playlist
        </button>
        <button onClick={addTracksToPlaylist}>Add To Playlist</button>
      </form>
    </div>
  );
}
