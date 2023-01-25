import React, { useState, useEffect } from 'react';
import SpotifyPreview from '../utils/SpotifyPreview';
const RecommendationsCard = (props) => {
  return (
    <div className="background">
      {props.artistData?.tracks &&
        props.artistData?.tracks.map((track, i) => (
          <>
            <p> {track?.name}</p>
            <p>popularity: {track?.popularity}</p>
            <SpotifyPreview link={track.external_urls?.spotify} />
          </>
        ))}
    </div>
  );
};
export default RecommendationsCard;
