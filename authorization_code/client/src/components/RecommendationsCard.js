import React, { useState, useEffect } from 'react';
import SpotifyPreview from '../utils/SpotifyPreview';
const RecommendationsCard = (props) => {
  console.log(props.artistData.tracks);

  return (
    <>
      <div>
        <h3>Suggestion</h3>
        {props.artistData &&
          props.artistData.tracks.map((track, i) => (
            <>
              <h2>{track.artists[0].name}</h2>
              <p>{track.name}</p>
              <p>{track.popularity}</p>
              <a href={track.external_urls.spotify} rel="noreferrer" target="_blank">
                Artist Profile
              </a>
              <br></br>
              <br></br>
              <SpotifyPreview link={track.external_urls.spotify} />
            </>
          ))}
      </div>
    </>
  );
};
export default RecommendationsCard;
