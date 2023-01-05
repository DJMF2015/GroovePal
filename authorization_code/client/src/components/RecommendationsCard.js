import React, { useState, useEffect } from 'react';
import SpotifyPreview from '../utils/SpotifyPreview';
const RecommendationsCard = (props) => {
  console.log({ props });
  return (
    <>
      {props.artistData?.tracks &&
        props.artistData?.tracks.map((track, i) => (
          <>
            <p>{track?.name}</p>
            <p>{track?.popularity}</p>
            <SpotifyPreview link={track.external_urls?.spotify} />
          </>
        ))}
    </>
  );
};
export default RecommendationsCard;
