import { useLocation } from 'react-router-dom';
import React from 'react';
import BackButton from './BackButton';
import Spotify from '../utils/SpotifyPlayer';

const styles = {
  container: {
    marginTop: '4rem',
    position: 'relative',
    textAlign: 'center',
  },
  h2: {
    margin: '2rem',
  },
  h3: {
    margin: '3rem',
  },
};
const PlaylistCard = () => {
  const location = useLocation();
  const { from } = location.state;
  return (
    <>
      <div style={styles.container}>
        <BackButton />
        <h2 style={styles.h2}>{from.name}</h2>
        <h3 style={styles.h3}>{from.description}</h3>
        <Spotify
          style={{ height: '600px', width: '50%' }}
          link={from.external_urls.spotify}
        />
      </div>
    </>
  );
};
export default PlaylistCard;
