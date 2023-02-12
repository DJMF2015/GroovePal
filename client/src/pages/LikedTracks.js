import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionWrapper from '../components/SectionWrapper';
import Spotify from '../utils/SpotifyPlayer';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default function Likedtracks() {
  const [likedtracks, setMyLikedTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSavedTracks = async () => {
      let offset = 0;
      const savedTracks = [];
      // loop through savedTracks until no more pages of results are returned
      const baseUrl = 'https://api.spotify.com/v1/me/tracks?';
      let lastResult = [];
      do {
        try {
          const response = await axios.get(`${baseUrl}`, {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
            params: {
              limit: 50,
              offset: offset,
            },
          });
          if (response.status !== 200) {
            console.log('Error: ', response.status);
          } else if (response.status === 204 || response.status > 400) {
            console.log('No Content');
          }

          setLoading(true);
          const data = await response.data;
          lastResult = data;
          data.items.forEach((item) => {
            savedTracks.push(item);
          });
          offset += 50; // increment offset by 50 to get next page
        } catch (error) {
          console.log(error);
        }
      } while (
        // check if there is a next page of results
        lastResult.next !== null &&
        lastResult.next !== undefined &&
        lastResult.next !== ''
      );

      setMyLikedTracks(savedTracks);
      setLoading(false);
    };

    getSavedTracks();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: 'center', color: 'red' }}>Loading......</h2>;
  }

  return (
    <div className="background">
      <SectionWrapper
        title="Top Genres"
        seeAllLink="/"
        titles="Top Artists"
        seeAllLinks="/artists"
        seeAllTracks="/tracks"
        titleTracks="Top Tracks"
        seeAllPlaylists="/playlists"
        titlePlaylists="Top Playlists"
        seeAllStarred="/starred"
        seeStarredTracks="Starred Tracks"
      />
      <h2>Tracks: {likedtracks.length}</h2>
      {likedtracks &&
        likedtracks.map((track, i) => (
          <>
            <>
              <h3 style={{ margin: '0 auto', marginTop: '1rem', textAlign: 'center' }}>
                {track.track.name}
              </h3>
              <img
                src={track.track.album.images[0].url}
                alt="album art"
                style={{
                  width: '10%',
                  margin: '0  auto',
                  display: 'block',
                  marginTop: '1rem',
                  borderRadius: '50%',
                  border: '2px solid white',
                }}
              />
            </>

            <Spotify
              link={track.track.external_urls.spotify}
              style={{
                width: '80%',
                height: '100px',
                marginTop: '1rem',
                border: '1px solid black',
              }}
            />
          </>
        ))}
    </div>
  );
}
