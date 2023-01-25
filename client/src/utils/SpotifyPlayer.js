const SpotifyPlayer = ({
  link,
  style = {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: '100%',
    margin: '0 auto',
    marginTop: '20px',
    // border: '1px solid ghostwhite',
    boxShadow: '15px 10px 15px 5px white',
    overflow: 'hidden',
    // paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
  },
  wide = false,
  width = wide ? '100%' : 300,
  height = wide ? 80 : 380,
  noreferrer = true,
  allow = 'encrypted-media',
  loading = 'lazy',
  ...props
}) => {
  const url = new URL(link);
  return (
    <>
      <iframe
        title="Spotify Web Player"
        src={`https://open.spotify.com/embed${url.pathname}`}
        loading={loading}
        width={width}
        height={height}
        allow={allow}
        style={{
          borderRadius: 8,
          ...style,
        }}
        {...props}
      />
    </>
  );
};

export default SpotifyPlayer;
