const useShuffle = (data) => {
  const shuffledTracks = data.sort(() => 0.5 - Math.random());
  console.log({ shuffledTracks });
  return shuffledTracks;
};
export default useShuffle;
