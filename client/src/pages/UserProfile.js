import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlayList from './Playlist';
import useAuth from '../hooks/useAuth';
const spotifyApi = new SpotifyWebApi();
const UserProfile = () => {
  const { profile } = useAuth();
  //   const profile = await spotifyApi.getMe();
  //   const userprofile = await spotifyApi.getUser(profile.id);
  console.log({ profile });
};
export default UserProfile;
