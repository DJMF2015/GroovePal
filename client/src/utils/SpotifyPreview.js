const SpotifyPreview = ({
  link,
  style = {
    backgroundColor: 'transparent',
    margin: '0 auto',
  },
}) => {
  const url = new URL(link);
  return (
    <iframe
      title="Spotify Web Player"
      src={`https://open.spotify.com/embed${url.pathname}`}
      style={style}
      allowtransparency="true"
    ></iframe>
  );
};
export default SpotifyPreview;
