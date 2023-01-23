const useShuffle = (data) => {
  const shuffledTracks = data.sort(() => 0.5 - Math.random());
  return shuffledTracks;
};
export default useShuffle;
