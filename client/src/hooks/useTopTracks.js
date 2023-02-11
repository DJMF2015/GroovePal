import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const accessToken = spotifyApi.getAccessToken();
//fetch user top tracks from spotify api

const useTopTracks = (timeRange) => {
  const [topTracks, setTopTracks] = useState([]);
  useEffect(() => {
    const getTopTracks = async () => {
      /* Get a User’s Top Tracks*/
      const resp = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 50,
            offset: 0,
          },
        }
      );
      const data = await resp.json();
      setTopTracks(data.items);
    };
    getTopTracks();
  }, [timeRange]);

  return { topTracks, accessToken };
};
export default useTopTracks;
