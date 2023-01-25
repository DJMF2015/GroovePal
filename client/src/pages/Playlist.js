// import logo from './logo.svg';
import '../App.css';
import axios from 'axios';
import Artists from '../pages/Artists';
import GenreFilterButton from '../components/FilterButton';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import TimeRangeButton from '../components/TimeRangeButton';
import useToggleTimeRange from '../hooks/useTimeRange';
// import { accessToken, logout } from '../utils/AuthHelper';
import styled from 'styled-components/macro';
import { GlobalStyle } from '../styles';
import Login from '../pages/Login';
import useTopArtists from '../hooks/useTopArtists';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
const spotifyApi = new SpotifyWebApi();

const PlayList = (props) => {
  // console.log({ accessToken });
  const [searchKey, setSearchKey] = useState();
  const [artists, setArtists] = useState([]);
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { spotifyToken, loggedIn, profile } = useAuth();
  const access_token = spotifyApi.getAccessToken();
  // const [spotifyToken, setSpotifyToken] = useState(null);
  const [getRecent, setRecentlyPlayed] = useState([]);
  const { genre, timeRanges } = useTopArtists(timeRange);

  const StyledLogoutButton = styled.button`
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-md);
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--white);
    font-size: var(--fz-sm);
    font-weight: 700;
    border-radius: var(--border-radius-pill);
    z-index: 10;
    @media (min-width: 768px) {
      right: var(--spacing-lg);
    }
  `;
  const searchArtists = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.get('https://api.spotify.com/v1/search?', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: searchKey,
        type: 'track,artist,playlist',
      },
    });
    setArtists(data.artists.items);
    setPlaylist(data.playlists.items);
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
          limit: 30,
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
    <>
      <div className="background">
        <h3>Top Genres</h3>
        {/* {props.profile && (
        <div>
          <h1>{props.profile.display_name}</h1>
          <p>{props.profile.followers.total} Followers</p>
          {props.profile.images.length && props.profile.images[0].url && (
            <img
              style={{
                width: '150px',
                height: '150px',
                display: 'inline-block',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
              }}
              src={props.profile.images[0].url}
              alt="Avatar"
            />
          )}
        </div>
      )} */}
        <GlobalStyle />

        <TimeRangeButton
          onClick={toggleTimeRange}
          timeRangeText={timeRangeText}
          timeRanges={timeRanges}
        />

        <>
          <GenreFilterButton
            genre={genre}
            renderGenre={renderGenre}
            renderSearch={renderSearch}
            searchArtists={searchArtists}
          />

          <Artists playlist={playlist} />
        </>
        <br></br>
        <div className="background">
          <h3>Recently Played</h3>

          {getRecent &&
            getRecent.map((track, i) => (
              <>
                <p>{track.track.name}</p>
                <SpotifyPreview link={track.track.external_urls.spotify} />
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default PlayList;
