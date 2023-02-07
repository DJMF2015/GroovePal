import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
//fetch user top tracks from spotify api

const useTopTracks = (timeRange) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const getTopTracks = () => {
      /* Get a User’s Top Tracks*/
      spotifyApi.getMyTopTracks({ limit: 50, offset: 0, time_range: timeRange }).then(
        function (data) {
          let topTracks = data;
          setTopTracks(topTracks);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    };
    getTopTracks();
  }, [timeRange]);
  console.log({ topTracks });
  return { topTracks };
};
export default useTopTracks;
