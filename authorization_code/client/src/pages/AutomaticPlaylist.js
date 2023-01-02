import '../App.css';
import Spotify from '../utils/Spotify';
import getTokenfromUrl from '../utils/Hash';
import React, { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

// Known Xmas Positive Genres
// Top 86 mainstream xmas positive genres obtained from https://everynoise.com/everynoise1d.cgi?vector=xmasness&scope=mainstream%20only&xmas=true
const knownXmasPositiveGenres = [
  'acoustic pop',
  'adult standards',
  'album rock',
  'alt z',
  'alternative rock',
  'art rock',
  'blues rock',
  'bolero',
  'bubblegum pop',
  'ccm',
  'chanson',
  "children's music",
  'christian alternaive rock',
  'christian music',
  'classic rock',
  'classic soul',
  'classical',
  'contemporary country',
  'contemporary r&b',
  'country',
  'country dawn',
  'country pop',
  'country road',
  'country rock',
  'dance pop',
  'disco',
  'dutch pop',
  'easy listening',
  'edm',
  'europop',
  'folk',
  'folk rock',
  'french pop',
  'funk',
  'german pop',
  'german rock',
  'hard rock',
  'hip hop',
  'hip pop',
  'hollywood',
  'indie folk',
  'indie pop',
  'indie rock',
  'italian adult pop',
  'j-pop',
  'k-pop',
  'kleine hoerspiel',
  'latin pop',
  'lounge',
  'mellow gold',
  'modern country rock',
  'musica mexicana',
  'neo soul',
  'neo-classical',
  'new americana',
  'new wave',
  'new wave pop',
  'norwegian pop',
  'opm',
  'pop',
  'pop punk',
  'pop rap',
  'quiet storm',
  'r&b',
  'ranchera',
  'rap',
  'rock',
  'rock-and-roll',
  'rockabilly',
  'roots rock',
  'salsa',
  'show tunes',
  'singer-songwriter',
  'sleep',
  'soft rock',
  'soul',
  'soundtrack',
  'stomp and holler',
  'swedish pop',
  'texas counrty',
  'tropical',
  'urban contemporary',
  'viral pop',
  'vocal jazz',
  'world worship',
  'worship',
];

// Letters for the secret message
const secretMessage = [
  'M',
  'E',
  'R',
  'R',
  'Y',
  'C',
  'H',
  'R',
  'I',
  'S',
  'T',
  'M',
  'A',
  'S',
  'A',
  'N',
  'D',
  'A',
  'H',
  'A',
  'P',
  'P',
  'Y',
  'N',
  'E',
  'W',
  'Y',
  'E',
  'A',
  'R',
];

// Fall back Christmas songs
const fallBackChristmasSongs = [
  "Mary's Boy Child",
  "(Everybody's Waitin' for) The Man with the Bag",
  "Rockin' Around the Christmas Tree",
  'Rudolph the Red-Nosed Reindeer (song)',
  'You Make It Feel Like Christmas (song)',
  'Cozy Little Christmas',
  'Happy Holiday bing crosby',
  'Run Rudolph Run',
  "It's the Most Wonderful Time of the Year",
  'Sleigh Ride',
  'This Christmas',
  'Merry Christmas, Happy Holidays',
  'All Alone on Christmas',
  'Spirit of the Season',
  'Angelus ad virginem',
  'Not Another Christmas Song',
  "Don't Shoot Me Santa",
  'All Alone on Christmas',
  'Have Yourself a Merry Little Christmas',
  "A Change at Christmas (Say It Isn't So)",
  'Peace on Earth/Little Drummer Boy',
  'Please Come Home for Christmas',
  "You're All I Want For Christmas",
  'Not This Year',
  'El Noi de la Mare',
  'Walking in the air',
  'You Make It Feel Like Christmas (song)',
  'Early Christmas Morning',
  'All I Want for Christmas Is You',
  "Rockin' Around the Christmas Tree",
];

// Playlist length determined from the length of the secret message
const playlistLength = secretMessage.length;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Automatic playlist function
function AutomaticPlaylist() {
  const [userGenres, setUserGenres] = useState([]);
  const [userGenresFound, setUserGenresFound] = useState(false);
  const [userXmasGenres, setUserXmasGenres] = useState([]);
  const [userXmasGenresFound, setUserXmasGenresFound] = useState(false);
  const [userXmasTracks, setUserXmasTracks] = useState([]);
  const [userXmasTracksFound, setUserXmasTracksFound] = useState(false);
  const [userXmasPlaylist, setUserXmasPlaylist] = useState([]);
  const [userXmasPlaylistCreated, setUserXmasPlaylistCreated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState([]);
  const [secretMessagePlaylist, setSecretMessagePlaylist] = useState(false);

  const [playlistName, setPlaylistName] = useState('');

  // Set up the page and playlist name, based on the users Spotify info
  useEffect(() => {
    const setUp = async () => {
      while (!loggedIn) {
        const me = await spotifyApi.getMe();
        setProfile(me);
        setLoggedIn(true);
        setPlaylistName(me.display_name + "'s Personalised Festive Playlist!");
      }
    };
    setUp();
  }, []);

  // Obtain the users genres
  useEffect(() => {
    const getUserGenres = async () => {
      // Obtain the top artists from the users profile
      spotifyApi.getMyTopArtists({ limit: 100, offset: 0 }).then(
        function (response) {
          let genres = [];

          for (let i = 0; i < response.items.length; i++) {
            for (let j = 0; j < response.items[i].genres.length; j++) {
              genres.push(response.items[i].genres[j]);
            }
          }

          setUserGenres(genres);
          setUserGenresFound(true);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    };

    if (loggedIn) {
      getUserGenres();
    }
  }, [loggedIn]);

  // Determine the users xmas positive genres
  useEffect(() => {
    const getUserXmasGenres = async () => {
      let xmasGenres = [];

      for (let i = 0; i < knownXmasPositiveGenres.length; i++) {
        var xmasCount = 0;
        for (let j = 0; j < userGenres.length; j++) {
          if (userGenres[j] === knownXmasPositiveGenres[i]) {
            xmasCount++;
          }
        }

        // Check if the xmas count is greater than zero
        if (xmasCount > 0) {
          xmasGenres.push({
            genre: knownXmasPositiveGenres[i],
            popularity: xmasCount,
          });
        }
      }

      xmasGenres.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));

      setUserXmasGenres(xmasGenres);
      setUserXmasGenresFound(true);
    };

    if (userGenresFound === true) {
      getUserXmasGenres();
    }
  }, [userGenresFound]);

  const getRandomNumber = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber + 1);
  };

  // Obtain tracks
  useEffect(() => {
    const getXmasTracklist = async () => {
      let tracklist = [];

      // Make playlist as normal
      for (let i = 0; i < playlistLength; i++) {
        let randomIdx = getRandomNumber(userXmasGenres.length - 1);
        let limitValue = 30;
        let offsetValue = getRandomNumber(5) * 5;

        let genre = userXmasGenres[randomIdx].genre;

        let keywords = 'christmas, xmas,' + genre;

        const response = await spotifyApi.searchTracks(keywords, {
          limit: `${limitValue}`,
          offset: `${offsetValue}`,
        });

        const tracks = response.tracks.items;

        const randomTrack = getRandomNumber(tracks.length - 1);
        const track = tracks[randomTrack];
        tracklist.push(track);

        delay(100).then(() => console.log('ran after 0.1s passed'));
      }

      setUserXmasTracks(tracklist);
      setUserXmasTracksFound(true);
    };

    if (userXmasGenresFound) {
      getXmasTracklist();
    }
  }, [userXmasGenresFound]);

  useEffect(() => {
    const createXmasPlaylist = async () => {
      let me = await spotifyApi.getMe();

      await spotifyApi.createPlaylist(me.id, {
        name: playlistName,
        public: false,
        description: 'Christmas tunes',
      });

      const playlists = await spotifyApi.getUserPlaylists(me.id);
      const existingPlaylist = await playlists.items.find((p) => p.name === playlistName);

      let trackUris = [];

      userXmasTracks.forEach((track) => {
        trackUris.push(track.uri);
      });

      await spotifyApi.addTracksToPlaylist(existingPlaylist.id, trackUris);

      setUserXmasPlaylist(existingPlaylist);
      setUserXmasPlaylistCreated(true);
    };

    if (userXmasTracksFound) {
      createXmasPlaylist();
    }
  }, [userXmasTracksFound]);

  return (
    <div className="App">
      <header className="App-header">
        {!loggedIn && <a href="http://localhost:8888">Login to Spotify</a>}

        {loggedIn && (
          <>
            <h1>Hello {profile.display_name}!</h1>
          </>
        )}

        {loggedIn && !userXmasPlaylistCreated && (
          <>
            <h2> Hold on! The elves are workin' on your festive playlist...</h2>
          </>
        )}

        {loggedIn && userXmasPlaylistCreated && (
          <>
            <h2> Here's your personalised festive playlist!</h2>
            {!secretMessagePlaylist && (
              <p>
                This playlist was created from your Spotify listening habits. It has
                automatically been saved to your Spotify account.
              </p>
            )}

            {secretMessagePlaylist && (
              <p>
                This playlist was created from your Spotify listening habits. It has
                automatically been sav... hold on. Is there something else here?
              </p>
            )}

            {<Spotify link={userXmasPlaylist.external_urls.spotify} />}
          </>
        )}
      </header>
    </div>
  );
}

export default AutomaticPlaylist;
