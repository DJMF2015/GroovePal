import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const AudioFeatures = (props) => {
  const [audioFeatures, setAudioFeatures] = useState([]);

  console.log('tracks ' + props.tracks[0].id);
  //
  useEffect(() => {
    /* Get Audio Features for a Track */
    spotifyApi.getAudioFeaturesForTrack(props.tracks[0].id).then(
      function (data) {
        console.log({ data });
        setAudioFeatures(data);
      },
      function (err) {
        // eslint-disable-next-line no-undef
        done(err);
      }
    );
  }, [props.tracks]);

  return (
    <>
      <div>
        <h1>Audio Features</h1>

        <p>{audioFeatures.acousticness}</p>
        <p>{audioFeatures.danceability}</p>
        <p>{audioFeatures.energy}</p>
        <p>{audioFeatures.loudness}</p>
        <p>{audioFeatures.liveness}</p>
        <p>{audioFeatures.valence}</p>
        <p>{audioFeatures.tempo}</p>
      </div>

      {/* <button onClick={getAudioFeaturesForTrack}>Get Audio Analysis</button> */}
    </>
  );
};

export default AudioFeatures;
