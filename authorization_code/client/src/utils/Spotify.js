const Spotify = ({
  link,
  style = {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: '100%',
    margin: '0 auto',
    marginTop: '20px',
    border: '1px solid ghostwhite',
    boxShadow: '15px 10px 15px 5px red',
  },
  wide = false,
  width = wide ? '100%' : 300,
  height = wide ? 80 : 380,
  frameBorder = 0,
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
        frameBorder={frameBorder}
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

export default Spotify;
