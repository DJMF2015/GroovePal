// import logo from './logo.svg';
import '../App.css';
import axios from 'axios';
import Artists from './Artists';
import GenreFilterButton from '../components/FilterButton';
import React, { useState } from 'react';
import TimeRangeButton from '../components/TimeRangeButton';
import useToggleTimeRange from '../hooks/useTimeRange';
import useTopArtists from '../hooks/useTopArtists';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyPreview from '../utils/SpotifyPreview';
const spotifyApi = new SpotifyWebApi();

const PlayList = () => {
  const [searchKey, setSearchKey] = useState();
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);

  const access_token = spotifyApi.getAccessToken();
  const { genre, timeRanges } = useTopArtists(timeRange);

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
  // const

  return (
    <>
      <div className="background">
        <GenreFilterButton
          genre={genre}
          renderGenre={renderGenre}
          renderSearch={renderSearch}
          searchArtists={searchArtists}
        />
        {genre.length === 0 ? (
          <h2>Sorry - Not enough data. Try back later to discover your top genres :(</h2>
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
