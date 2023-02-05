import React, { useState, useEffect } from 'react';
import SortByTopGenres from '../utils/TopGenres';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const useTopArtists = (timeRange) => {
  const [genre, setGenre] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  useEffect(() => {
    const getTopArtists = () => {
      /* Get a User’s Top Artists*/
      spotifyApi.getMyTopArtists({ limit: 50, offset: 0, time_range: timeRange }).then(
        function (data) {
          let topArtists = data;
          setTopArtists(topArtists);
          SortByTopGenres({ topArtists, setGenre });
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    };
    getTopArtists();
  }, [timeRange]);
  return { genre, topArtists };
};
export default useTopArtists;
