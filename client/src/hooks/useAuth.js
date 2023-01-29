import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getTokenfromUrl from '../utils/Hash';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const useAuth = () => {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const spotifyToken = getTokenfromUrl().access_token;
    window.location.hash = '';
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        setProfile(user);
      });
      setLoggedIn(true);
    }
  }, [profile, loggedIn, spotifyToken]);

  return { spotifyToken, loggedIn, profile };
};

export default useAuth;
