import '../App.css';
import axios from 'axios';
import Artists from './Artists';
import GenreFilterButton from '../components/GenreFilterButton';
import React, { useState } from 'react';
import TimeRangeButton from '../components/TimeRangeButton';
import useToggleTimeRange from '../hooks/useTimeRange';
import StyledHeader from '../styles/StyledHeader';
import useShuffle from '../hooks/useShuffle';
import useTopArtists from '../hooks/useTopArtists';
import SearchBar from '../components/SearchBar';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
const spotifyApi = new SpotifyWebApi();

const PlayList = (props) => {
  const [searchKey, setSearchKey] = useState();
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);

  const access_token = spotifyApi.getAccessToken();
  const { genre, timeRanges } = useTopArtists(timeRange);
  useShuffle(playlist); // shuffle the order of playlists based on the genre

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search?', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: searchKey,
        type: 'track,artist,playlist',
      },
    });

    setPlaylist(data.playlists.items);
  };

  const renderGenre = (e) => {
    console.log(e);
    setSearchKey(e);
  };

  const renderSearch = async (e) => {
    setSearchKey(e);
    const { data } = await axios.get('https://api.spotify.com/v1/search?', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: searchKey,
        type: 'track,artist,playlist',
      },
    });
    setTracks(data.tracks.items);
  };

  return (
    <>
      <div className="background">
        <StyledHeader type="user">
          <div className="header__inner">
            {props.profile &&
              props.profile.images &&
              props.profile.images[0] &&
              props.profile.images[0].url && (
                <>
                  <img
                    loading="lazy"
                    className="header__img"
                    src={props.profile?.images[0].url}
                    alt="profile name"
                  />
                  <div>
                    <h2 className="header__name">
                      {props.profile.display_name}'s Top Genres
                    </h2>
                    <span style={{ float: 'left' }}>
                      {props.profile.followers.total} Follower
                      {props.profile.followers.total !== 1 ? 's' : ''}
                    </span>
                  </div>
                </>
              )}
          </div>
        </StyledHeader>
        <SearchBar renderSearch={renderSearch} />

        <GenreFilterButton
          genre={genre}
          renderGenre={renderGenre}
          searchArtists={searchArtists}
        />
        {genre.length === 0 ? (
          <h2 style={{ fontSize: '28px' }}>
            Sorry - Not enough data. Try back later to discover your top genres &#128577;
          </h2>
        ) : (
          <>
            <TimeRangeButton
              onClick={toggleTimeRange}
              timeRangeText={timeRangeText}
              timeRanges={timeRanges}
            />

            <Artists playlist={playlist} />
          </>
        )}
        <br></br>

        <div className="background">
          {tracks &&
            tracks
              .map((track, i) => (
                <>
                  <p>{track.name}</p>

                  <SpotifyPreview
                    style={{ width: '200px', height: '100px', border: '1px solid black' }}
                    link={track.external_urls.spotify}
                  />
                </>
              ))
              .slice(0, 5)}
        </div>
      </div>
    </>
  );
};

export default PlayList;
