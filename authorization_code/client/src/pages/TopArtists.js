import Spotify from '../utils/Spotify';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';
import RecommendationsCard from '../components/RecommendationsCard';
const spotifyApi = new SpotifyWebApi();

export default function TopArtists() {
  const [access_token, setAccessToken] = useState('');
  const [artist, setArtists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setSeedforRecommendations] = useState([]);
  const [profile, setProfile] = useState([]);
  const [artistData, setArtistData] = useState([]);
  // console.log({ data });
  useEffect(() => {
    const fetchTopArtists = async () => {
      const access_token = spotifyApi.getAccessToken();
      setAccessToken(access_token);

      spotifyApi.getMe().then((data) => {
        console.log({ data });
        setProfile(data);
      });
      setLoading(true);
      const response = await axios
        .get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            time_range: 'long_term',
            limit: 50,
            offset: 0,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      const topArtistsId = response.data.items.map((artist) => artist.id);
      const seeds = topArtistsId.slice(0, 5);

      setSeedforRecommendations(seeds);
      let topArtists = response.data.items.map((artist) => artist);
      setArtists(topArtists);
      setTopArtists(topArtistsId);
    };

    fetchTopArtists();
    setLoading(false);
  }, []);

  const getRecommendations = async () => {
    spotifyApi
      .getRecommendations({
        min_energy: 0.5,
        seed_artists: recommendations,
        min_popularity: 30,
      })
      .then(
        function (data) {
          let recommendations = data;
          setArtistData(recommendations);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{profile.display_name} Top Artists</h2>

      {/* <div style={{ marginLeft: '45vw', position: 'relative' }}></div> */}
      <button onClick={() => getRecommendations()}>Get Suggestions</button>
      {artist
        .map((data, i) => (
          <div
            style={{
              // textAlign: 'center',
              // display: 'inline',
              width: '50%',

              listStyle: 'none',
              margin: '0 auto',
              padding: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gridGap: '1rem',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ color: 'white', marginTop: '4rem', marginLeft: '-1rem' }}>
              {i + 1} {data.name} {''}
            </h2>
            <img
              style={{
                position: 'relative',
                maxWidth: '100%',
                verticalAlign: 'middle',
                top: 0,
                width: '90%',
                height: '90%',
                objectFit: 'cover',
                backgroundColor: 'darkgrey',
                margin: '1rem',
                borderRadius: '50%',
              }}
              src={data.images[0].url}
              alt={data.name}
            />

            <Link
              to={`/artists/${data.id}`}
              state={{ from: data }}
              key={data.id}
              style={{
                textDecoration: 'none',
                marginTop: '4rem',
              }}
            >
              <div>
                <h3 style={{ textAlign: 'right' }}>{data.name} Artist Profile</h3>
              </div>
            </Link>
          </div>
        ))
        .slice(0, 50)}
      {''}

      {!loading && artistData && <RecommendationsCard artistData={artistData} />}
    </div>
  );
}
