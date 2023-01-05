import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Spotify from '../utils/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const styles = {
  img: {
    margin: '0 auto',
    borderRadius: '50%',
    display: 'flex',
  },

  link: {
    color: 'black',
    textDecoration: 'none',
    margin: '0px',
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    backgroundColor: 'ghostwhite',
    padding: '.5rem',
    borderRadius: '1rem',
    width: '50%',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'red',
  },
};

const ArtistDetailsCard = () => {
  const location = useLocation();
  const { from } = location.state;
  return (
    <>
      <div style={styles.div}>
        <h1>Artist Details</h1>
        <Link to="/artists" style={styles.link}>
          {' '}
          Back to Artists{' '}
        </Link>
        <img src={from.images[1].url} alt={from.name} style={styles.img} />
        <h2>{from.name}</h2>
        <h2>{from.followers.total}</h2>
        <h2>{from.genres}</h2>
        <h2>{from.popularity}</h2>
        <Spotify link={from.external_urls.spotify} style={styles.link} />
      </div>
    </>
  );
};
export default ArtistDetailsCard;
