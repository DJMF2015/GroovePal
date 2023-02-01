import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const useSearch = (e, searchTerm) => {
  const access_token = spotifyApi.getAccessToken();
  const [searchKey, setSearchKey] = useState();
  const [artists, setArtists] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
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
      setArtists(data.artists.items);
      setPlaylist(data.playlists.items);
    };
    searchArtists();
  }, [searchKey, access_token]);
  return { artists, playlist, searchKey };
};
export default useSearch;
