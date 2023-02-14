import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Spotify from '../utils/SpotifyPlayer';
import SpotifyWebApi from 'spotify-web-api-js';
import RelatedArtist from './RelatedArtist';
const spotifyApi = new SpotifyWebApi();

const styles = {
  img: {
    margin: '2px auto',
    borderRadius: '75%',
    display: 'flex',
    width: '10% ',
    height: '50%',
    boxShadow: '3px 2px 10px 0 ghostwhite',
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
    padding: '0rem',
    alignItems: 'center',
    color: 'red',
  },

  artist_tag: {
    color: 'white',
    fontSize: '1.5rem',
  },
};

const ArtistDetailsCard = () => {
  const [relatedArtist, setRelatedArtist] = useState([]);
  const location = useLocation();
  const { from } = location.state;
  const artistId = from.id;

  // Scroll to top of page when changing routes
  // https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  useEffect(() => {
    const getRelatedArtists = async (artistId) => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      );
      const response = await data;
      setRelatedArtist(response.artists);
    };
    getRelatedArtists(artistId);
  }, [artistId]);
  return (
    <>
      <ScrollToTop />

      <div style={styles.div}>
        <h1>Artist Details</h1>
        <Link to="/artists" style={styles.link}>
          {' '}
          Back to Artists{' '}
        </Link>
        <img src={from.images[1].url} alt={from.name} style={styles.img} />
        <h2>{from.name}</h2>
        <h2 style={styles.artist_tag}>Followers: {from.followers.total}</h2>

        <h2 style={styles.artist_tag}>Genres: {from.genres}</h2>
        <h2 style={styles.artist_tag}>Popularity: {from.popularity}</h2>
        <Spotify link={from.external_urls.spotify} style={styles.link} />
      </div>
      <h2 style={{ marginTop: '1rem', textAlign: 'center' }}>Related Artists</h2>
      {relatedArtist &&
        relatedArtist.map((artist, i) => (
          <>
            <RelatedArtist artist={artist} />
          </>
        ))}
    </>
  );
};
export default ArtistDetailsCard;
