import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Spotify from '../utils/SpotifyPlayer';
import SpotifyWebApi from 'spotify-web-api-js';
import { Img, Div, ArtistTag } from '../styles/StyledArtistCard';
import RelatedArtist from './RelatedArtist';
const spotifyApi = new SpotifyWebApi();

const styles = {
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
};

const ArtistDetailsCard = () => {
  const [relatedArtist, setRelatedArtist] = useState([]);
  const location = useLocation();
  const { from } = location.state;
  const artistId = from.id;

  // Scroll to top of page when changing routes
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

      <Div>
        <h1>Artist Details</h1>
        <Link to="/artists" style={styles.link}>
          {' '}
          Back to Artists{' '}
        </Link>
        <Img src={from.images[1].url} alt={from.name} />
        <h2>{from.name}</h2>
        <ArtistTag style={styles.artist_tag}>Followers: {from.followers.total}</ArtistTag>

        <h2 style={styles.artist_tag}>Genres: {from.genres}</h2>
        <h2 style={styles.artist_tag}>Popularity: {from.popularity}</h2>
        <Spotify link={from.external_urls.spotify} style={styles.link} />
      </Div>
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
