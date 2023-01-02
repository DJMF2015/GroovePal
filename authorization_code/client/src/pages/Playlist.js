// import logo from './logo.svg';
import '../App.css';
import axios from 'axios';
import UserProfile from './UserProfile';
import Artists from '../pages/Artists';
import GenreFilterButton from '../components/FilterButton';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import PlaylistWidget from '../components/PlaylistButton';
import Playlists from './Playlists';
import Spotify from '../utils/Spotify';
import useTopArtists from '../hooks/useTopArtists';
// import SpotifyWebApi from 'spotify-web-api-js';
// const spotifyApi = new SpotifyWebApi();

const PlayList = () => {
  const [searchKey, setSearchKey] = useState();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { spotifyToken, loggedIn, profile } = useAuth();
  const { genre } = useTopArtists();

  const searchArtists = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.get('https://api.spotify.com/v1/search?', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      params: {
        q: searchKey,
        type: 'playlist',
      },
    });
    console.log('data', data);
    setArtists(data.playlists.items);

    setLoading(false);
  };

  const renderGenre = (e) => {
    setSearchKey(e);
  };

  return (
    <div className="background">
      <br></br>
      {!loggedIn && <a href="http://localhost:8888">Login to Spotify</a>}
      {loggedIn && (
        <>
          <h3> {profile.display_name} profile </h3>

          <GenreFilterButton
            genre={genre}
            renderGenre={renderGenre}
            searchArtists={searchArtists}
          />
        </>
      )}

      {<Artists artists={artists} />}
    </div>
  );
};

export default PlayList;
