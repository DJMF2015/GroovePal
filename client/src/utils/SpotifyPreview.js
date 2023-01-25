const SpotifyPreview = ({
  link,
  style = {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: '50%',
    height: '5rem',
    margin: '0 auto',
    // boxShadow: '15px 10px 15px 5px red',
    overflow: 'hidden',
    // paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
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
