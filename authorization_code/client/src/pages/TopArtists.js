import Spotify from '../utils/SpotifyPlayer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';
import RecommendationsCard from '../components/RecommendationsCard';
const spotifyApi = new SpotifyWebApi();

const style = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '.5rem',
    gridAutoRows: 'minmax(100px, auto)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2vw',
    textAlign: 'center',
    padding: '0rem',
    borderRadius: '1rem',
    border: '5px solid white',
  },
};

export default function TopArtists() {
  const [artist, setArtists] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');
  const [timeRangeText, setTimeRangeText] = useState('All Time');
  const [loading, setLoading] = useState(false);
  const [recommendations, setSeedforRecommendations] = useState(null);
  const [profile, setProfile] = useState([]);
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const access_token = spotifyApi.getAccessToken();
      const baseUrl = `https://api.spotify.com/v1/me/top/artists?`;

      setLoading(true);
      const response = await axios
        .get(` ${baseUrl}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            limit: 20,
            offset: 0,
            time_range: timeRange,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      const topArtistsId = response.data.items.map((artist) => artist.id);
      const seeds = topArtistsId;
      // set random seed for recommendations
      const randomSeed = seeds[(Math.random() * seeds.length) | 0];
      setSeedforRecommendations(randomSeed);
      let topArtists = response.data.items.map((artist) => artist);
      setArtists(topArtists);
    };
    fetchTopArtists();
    setLoading(false);
  }, [timeRange]);

  useEffect(() => {
    const getRecommendations = async () => {
      const endpoint = 'https://api.spotify.com/v1/recommendations';
      const artistSeeds = encodeURIComponent(recommendations);

      const joinaArtistSeeds = artistSeeds.split(',').join('%2C');

      fetch(`${endpoint}?seed_artists=${joinaArtistSeeds}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        },
      }).then((response) =>
        response.json().then((data) => {
          console.log(data);
          setArtistData(data);
        })
      );
    };
    getRecommendations();
  }, [recommendations]);

  const toggleTimeRange = () => {
    if (timeRange === 'long_term') {
      setTimeRange('medium_term');
      setTimeRangeText('Last 6 Months');
    } else if (timeRange === 'medium_term') {
      setTimeRange('short_term');
      setTimeRangeText('Last 4 Weeks');
    } else if (timeRange === 'short_term') {
      setTimeRange('long_term');
      setTimeRangeText('All Time');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{profile.display_name} Top Artists</h2>

      <div>
        <button
          style={{
            marginLeft: '30vw',
            backgroundColor: 'black',
            color: 'white',
            margin: '0 auto',
            display: 'block',
            marginTop: '1rem',
            border: '2px solid white',
            borderRadius: '10rem',
            padding: '1rem',
          }}
          onClick={toggleTimeRange}
        >
          {timeRangeText}
        </button>
      </div>
      <div style={style.container}>
        {artist
          .map((data, i) => {
            return (
              <>
                <div
                  style={{
                    textAlign: 'left',
                    width: '50%',
                    listStyle: 'none',
                    margin: '0 auto',
                    padding: '0rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    justifyContent: 'center',
                  }}
                >
                  <h4>
                    {i + 1} {data.name} {''}
                  </h4>
                  <img
                    style={{
                      top: 0,
                      width: '35%',
                      height: '80%',
                      backgroundColor: 'darkgrey',
                      margin: '.1em',
                      borderRadius: '5%',
                    }}
                    src={data.images[2].url}
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
                      <h4 style={{ margin: '0 auto' }}> Profile</h4>
                    </div>
                  </Link>
                </div>
              </>
            );
          })
          .slice(0, 20)}
      </div>
      <h2 style={{ textAlign: 'center', color: 'red' }}>Recommendations</h2>
      {!loading && artistData && <RecommendationsCard artistData={artistData} />}
    </div>
  );
}
