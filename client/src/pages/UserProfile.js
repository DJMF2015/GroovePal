import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import useAuth from '../hooks/useAuth';
const UserProfile = async () => {
  // console.log({ userprofile });
  // const { profile } = useAuth();
  const spotifyApi = new SpotifyWebApi();
  const access_token = spotifyApi.getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();
  console.log({ data });
};
export default UserProfile;
