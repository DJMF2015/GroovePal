import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { spotifyToken, loggedIn, profile } = useAuth();

  console.log({ profile, spotifyToken });

  return <>{loggedIn && <a href="http://localhost:8888">Login to Spotify</a>}</>;
};

export default Home;
