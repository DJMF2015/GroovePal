// import logo from './logo.svg';
import '../App.css';
import axios from 'axios';
import Artists from '../pages/Artists';
import GenreFilterButton from '../components/FilterButton';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
// import styled from 'styled-components/macro';
import { GlobalStyle } from '../styles';
import Login from '../pages/Login';
import useTopArtists from '../hooks/useTopArtists';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
const spotifyApi = new SpotifyWebApi();

const PlayList = () => {
  const [searchKey, setSearchKey] = useState();
  const [artists, setArtists] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { spotifyToken, loggedIn, profile } = useAuth();
  const [getRecent, setRecentlyPlayed] = useState([]);
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
        type: 'track,artist,playlist',
      },
    });
    console.log('data', data);
    setArtists(data.artists.items);
    setLoading(false);
  };

  const renderGenre = (e) => {
    setSearchKey(e);
  };
  const renderSearch = (e) => {
    setSearchKey(e);
  };
  useEffect(() => {
    const getRecentlyPlayed = () => {
      // Get Current User's Recently Played Tracks
      spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 10,
          time_range: 'short_term',
        })
        .then(
          function (data) {
            // Output items
            console.log('Your 20 most recently played tracks are:');

            setRecentlyPlayed(data.items);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    };
    getRecentlyPlayed();
  }, []);
  return (
    <div className="background">
      <GlobalStyle />
      {!spotifyToken ? <Login /> : <h3> {profile.display_name} profile </h3>}
      {/* {loading && profile && <UserProfile profile={profile} />} */}
      <>
        <GenreFilterButton
          genre={genre}
          renderGenre={renderGenre}
          renderSearch={renderSearch}
          searchArtists={searchArtists}
        />
        <Artists artists={artists} />
      </>
      {/* <div className="background">
        <h3>Recently Played</h3>
        {getRecent &&
          getRecent.map((track, i) => (
            <>
              <p>{track.track.name}</p>
              <SpotifyPreview link={track.track.external_urls.spotify} />
            </>
          ))}
      </div> */}
    </div>
  );
};

export default PlayList;
