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
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridGap: '1rem',
    gridAutoRows: 'minmax(100px, auto)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5vw',
    textAlign: 'center',
    padding: '0rem',
  },

  imgTile: {
    textAlign: 'left',
    width: '50%',
    marginTop: '-6rem',
    listStyle: 'none',
    margin: '30px auto',
    padding: '0rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 2fr))',
    justifyContent: 'center',
  },
};

export default function TopArtists() {
  const [artist, setArtists] = useState([]);
  // import timeRange hook  from TimeRange.js
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

      await fetch(`${endpoint}?seed_artists=${joinArtistSeeds}&min_popularity=45`, {
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
  }, [recommendations]);

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
      <BackButton />
      {artist.length === 0 ? (
        <h2 style={{ textAlign: 'center' }}>
          {' '}
          Sorry. Not enough data. Please try again at a later date.
        </h2>
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
                  <>
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
                          width: '50%',
                          marginTop: '-4.5rem',
                          listStyle: 'none',
                        }}
                      />
                      <h4>
                        {i + 1} {data.name} {''}
                      </h4>
                    </Link>
                    <img style={style.imgTile} src={data.images[2].url} alt={data.name} />
                  </>
                );
              })
              .slice(0, 30)}
          </div>
        </>
      )}

      {artistData && <RecommendationsCard artistData={artistData} />}
    </div>
  );
}
