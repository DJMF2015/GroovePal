const SpotifyPreview = ({
  link,
  style = {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: '50%',
    height: '5rem',
    margin: '0 auto',
    boxShadow: '30px 1px 40px 2px ghostwhite',
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
