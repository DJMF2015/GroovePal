import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spotify from '../utils/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default function Likedtracks() {
  const [likedtracks, setMyLikedTracks] = useState([]);

  const [offset, setOffset] = useState(0);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  // const getSavedTracks = (offlimit) => {
  //   // Get tracks in the signed in user's Your Music library
  //   spotifyApi
  //     .getMySavedTracks({
  //       limit: 50,
  //       offset: offlimit,
  //     })
  //     .then(
  //       function (data) {
  //         setMyLikedTracks(data.items);
  //         console.log('saved tracks!', data);
  //       },
  //       function (err) {
  //         console.log('Something went wrong!', err);
  //       }
  //     );
  // };
  useEffect(() => {
    const getSavedTracks = async () => {
      let offset = 0;
      let limit = 50;
      const savedTracks = [];

      // loop through savedTracks until no more pages and concatanate results
      const baseUrl = 'https://api.spotify.com/v1/me/tracks?';
      let lastResult = [];
      // try catch to catch any errors in the async api call
      do {
        try {
          const response = await axios.get(`${baseUrl}${limit}&${offset}`, {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
            params: {
              limit: 50,
              offset: offset,
            },
          });

          setLoading(true);
          const data = await response.data;
          lastResult = data;
          data.items.forEach((item) => {
            savedTracks.push(item);
          });
          offset += 50; // increment offset by 50
        } catch (error) {
          console.log(error);
        }
      } while (
        lastResult.next !== null &&
        lastResult.next !== undefined &&
        lastResult.next !== '' &&
        offset < 150
      );

      setMyLikedTracks(savedTracks);
      setLoading(false);
    };

    getSavedTracks();
  }, []);

  console.log({ likedtracks });
  if (loading) {
    return <div>Loading...</div>;
  }
  // const handleChange = () => {
  //   const nextArtist = topArtists.shift();
  //   topArtists.push(nextArtist);
  //   setTopArtists(topArtists);
  //   let next = offset;
  //   next += 50;
  //   setOffset(next);
  //   getSavedTracks(offset);
  // };

  return (
    <div>
      {/* <button
        // style={{ backgroundColor: 'darkred', margin: 0, padding: '10px' }}
        onClick={getSavedTracks}
      >
        {' '}
        {'Next'} ⏭️
      </button> */}

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
                  width: '15%',
                  margin: '0  auto',
                  display: 'block',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                  borderRadius: '50%',
                }}
              />
              {/* <audio controls style={{ width: '90%', marginLeft: '5vw' }}>
                <source src={track.track.preview_url} type="audio/mp3" />
              </audio> */}
            </>

            <Spotify
              link={track.track.external_urls.spotify}
              style={{
                width: '90%',
                height: '5rem',
                marginTop: '1rem',
                marginLeft: '5vw',
              }}
            />
          </>
          // </div>
        ))}
    </div>
  );
}
