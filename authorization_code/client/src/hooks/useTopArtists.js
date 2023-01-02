import React, { useState, useEffect } from 'react';
import SortByTopGenres from '../utils/Genres';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const useTopArtists = () => {
  const [genre, setGenre] = useState([]);
  useEffect(() => {
    const getTopArtists = () => {
      /* Get a User’s Top Artists*/
      spotifyApi.getMyTopArtists({ limit: 50, offset: 0, time_range: 'long_term' }).then(
        function (data) {
          let topArtists = data;
          SortByTopGenres({ topArtists, setGenre });
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    };
    getTopArtists();
  }, []);
  console.log({ genre });
  return { genre };
};
export default useTopArtists;
