import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import TimeRangeButton from '../components/TimeRangeButton';
import useToggleTimeRange from '../hooks/useTimeRange';
import StyledArtistGrid from '../styles/StyledArtistsGrid';
import { SectionWrapper } from '../components';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import RecommendationsCard from '../components/RecommendationsCard';
const spotifyApi = new SpotifyWebApi();

const initialState = {
  popularity: 45,
  instrumentalness: 0.2,
  danceability: 0.2,
  energy: 0.2,
  valence: 0.2,
  tempo: 100,
  speechiness: 0.35,
};
export default function TopArtists() {
  const [artist, setArtists] = useState([]);
  const [initialValues, setValues] = useState(initialState);
  const { timeRange, timeRangeText, toggleTimeRange } = useToggleTimeRange();
  const [loading, setLoading] = useState(false);
  const [recommendations, setSeedforRecommendations] = useState(null);
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const access_token = spotifyApi.getAccessToken();
      const baseUrl = `https://api.spotify.com/v1/me/top/artists?`;

      const response = await axios
        .get(`${baseUrl}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            limit: 50,
            offset: 0,
            time_range: timeRange,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(true);
      const topArtistsSeedsId = response.data.items
        .map((artist) => artist.id)
        .slice(0, 20); // get top 20 artists seeds
      setSeedforRecommendations(topArtistsSeedsId);

      let topArtists = response.data.items.map((artist) => artist); // get top 50 artists
      setArtists(topArtists);
    };
    fetchTopArtists();
    setLoading(false);
  }, [timeRange]);
  useEffect(() => {
    // get recommendations from seed data from top artists
    const getRecommendations = async () => {
      const artistSeeds = decodeURIComponent(recommendations);
      const joinArtistSeeds = artistSeeds.split(',').join('&');
      const endpoint = `https://api.spotify.com/v1/recommendations?seed_artists=${joinArtistSeeds}`;
      const params = new URLSearchParams({
        // URLSearchParams to create a query string
        min_popularity: initialValues.popularity,
        min_instrumentalness: initialValues.instrumentalness,
        min_danceability: initialValues.danceability,
        min_energy: initialValues.energy,
        min_valence: initialValues.valence,
        min_tempo: initialValues.tempo,
        target_speechiness: initialValues.speechiness,
      });

      const url = `${endpoint}?${params.toString()}`;
      await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        },
      }).then((response) =>
        response
          .json()
          .then((data) => {
            setArtistData(data);
          })
          .catch((error) => {
            console.log('unable to retrieve recommendation from seed data' + error);
          })
      );
    };
    getRecommendations();
  }, [recommendations, initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // get name and value from input
    setValues({
      ...initialValues,
      [name]: value,
    });
  };
  return (
    <div style={{ margin: '20px', marginLeft: '10px', marginTop: '30px' }}>
      <SectionWrapper
        title="Top Genres"
        seeAllLink="/"
        titles="Top Artists"
        seeAllLinks="/artists"
        seeAllTracks="/tracks"
        titleTracks="Top Tracks"
        seeAllPlaylists="/playlists"
        titlePlaylists="Playlists"
        seeAllStarred="/starred"
        seeStarredTracks="Liked Songs"
      />

      <BackButton style={{ marginLeft: '-10em' }} />
      <h2 style={{ marginLeft: '25em', marginTop: '-2rem' }}>
        {timeRangeText} -- Top Artists
      </h2>

      {artist.length === 0 ? (
        <>
          <h2 style={{ textAlign: 'center', fontSize: '28px' }}>
            {' '}
            Sorry. Not enough data. Please try again at a later date. &#128577;
          </h2>
        </>
      ) : (
        <>
          <TimeRangeButton onClick={toggleTimeRange} timeRangeText={timeRangeText} />

          <StyledArtistGrid>
            {artist
              .map((data, i) => {
                return (
                  <div
                    style={{
                      borderRadius: '10px',
                      display: 'inline-flex',
                      padding: '10px',
                    }}
                  >
                    <Link
                      to={`/artists/${data.id}`}
                      state={{ from: data }}
                      key={data.id}
                      style={{
                        textDecoration: 'none',
                        marginTop: '4rem',
                      }}
                    >
                      <div
                        style={{
                          textAlign: 'left',
                          marginTop: '-4rem',
                          listStyle: 'none',
                        }}
                      />
                      <h4>
                        {i + 1} {data.name} {''}
                      </h4>
                      <img
                        className="image-tile"
                        src={data.images[2].url}
                        alt={data.name}
                      />
                    </Link>
                  </div>
                );
              })
              .slice(0, 30)}
          </StyledArtistGrid>
        </>
      )}

      {artistData && (
        <RecommendationsCard
          artistData={artistData}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}
