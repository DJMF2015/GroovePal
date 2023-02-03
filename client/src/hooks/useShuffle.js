// This function uses the Fisher-Yates algorithm to shuffle an array of tracks .https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
import { useEffect, useState } from 'react';
const useShuffle = (data) => {
  const [shuffledTracks, setShuffledTracks] = useState([]);
  useEffect(() => {
    const shuffledTracks = data.sort(() => 0.5 - Math.random());
    setShuffledTracks(shuffledTracks);
    // return shuffledTracks;
  }, [data]);
  console.log(shuffledTracks);
  return { shuffledTracks };
};
export default useShuffle;
