import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import TimeRangeButton from '../components/TimeRangeButton';
import useToggleTimeRange from '../hooks/useTimeRange';
import { SectionWrapper } from '../components';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import RecommendationsCard from '../components/RecommendationsCard';
const spotifyApi = new SpotifyWebApi();

const style = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 2fr))',
    gridGap: '0rem',
    gridAutoRows: 'minmax(100px, auto)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2vw',
    textAlign: 'center',
    padding: '0rem',
  },

  imgTile: {
    textAlign: 'left',
    alignItems: 'left',
    maxWidth: '100px',
    minWidth: '100px',
    marginTop: '-6rem',
    listStyle: 'none',
    margin: '20px 10px auto',
    padding: '0rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 2fr))',
    objectFit: 'contain',
    justifyContent: 'center',
  },
};

const initialState = {
  popularity: 45,
  instrumentalness: 0.2,
  danceability: 0.2,
  energy: 0.2,
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
      const topArtistsSeedsId = response.data.items.map((artist) => artist.id);
      // set random seed for recommendations from top artists
      const randomSeeds =
        topArtistsSeedsId[(Math.random() * topArtistsSeedsId.length) | 0];
      setSeedforRecommendations(randomSeeds);
      let topArtists = response.data.items.map((artist) => artist);
      setArtists(topArtists);
    };
    fetchTopArtists();
    setLoading(false);
  }, [timeRange]);

  useEffect(() => {
    // get recommendations from seed data from top artists
    const getRecommendations = async () => {
      const endpoint = 'https://api.spotify.com/v1/recommendations';
      const artistSeeds = encodeURIComponent(recommendations);
      const joinArtistSeeds = artistSeeds.split(',').join('%2C');
      await fetch(
        `${endpoint}?seed_artists=${joinArtistSeeds}&min_popularity=${initialValues.popularity}&min_instrumentalness=${initialValues.instrumentalness}&min_danceability=${initialValues.danceability}&min_energy=${initialValues.energy} `,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((response) =>
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
    const { name, value } = e.target;
    console.log({ name, value });
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
        titlePlaylists="Top Playlists"
        seeAllStarred="/starred"
        seeStarredTracks="Starred Tracks"
      />
      <BackButton style={{ marginLeft: '-10em' }} />

      {artist.length === 0 ? (
        <>
          <h2 style={{ textAlign: 'center', fontSize: '28px' }}>
            {' '}
            Sorry. Not enough data. Please try again at a later date. &#128577;
          </h2>
        </>
      ) : (
        <>
          <TimeRangeButton
            onClick={toggleTimeRange}
            timeRangeText={timeRangeText}
            style={style}
          />

          <div style={style.container}>
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
                        style={style.imgTile}
                        src={data.images[2].url}
                        alt={data.name}
                      />
                    </Link>
                  </div>
                );
              })
              .slice(0, 30)}
          </div>
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
