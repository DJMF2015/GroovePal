const SpotifyPreview = ({
  link,
  style = {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: '50%',
    height: '5rem',
    margin: '0 auto',
    // border: '1px solid ghostwhite',
    boxShadow: '30px 1px 40px 2px ghostwhite',
  },
  wide = false,
  width = wide ? '50%' : 300,
  height = wide ? 50 : 380,
  frameBorder = 0,
  noreferrer = true,
  allow = 'encrypted-media',
  loading = 'lazy',
  ...props
}) => {
  const url = new URL(link);
  return (
    <iframe
      title="Spotify Web Player"
      src={`https://open.spotify.com/embed${url.pathname}`}
      //   width="40%"
      style={style}
      //   height="400px"
      frameborder="0"
      allowtransparency="true"
    ></iframe>
  );
};
export default SpotifyPreview;
