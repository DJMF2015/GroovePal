import StyledRelatedArtists from '../styles/RelatedArtistsStyles';

const RelatedArtist = (props) => {
  const genres = props?.artist.genres.map((genre, i) => {
    const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
    return (
      <>
        <p>{formattedGenre}</p>
      </>
    );
  });
  return (
    <>
      <StyledRelatedArtists>
        <p>
          {' '}
          <h4>Artist</h4>
          {props?.artist.name}
        </p>
        <p>
          {' '}
          <h4>Popularity</h4>
          {props?.artist.popularity}
        </p>
        <p>
          {' '}
          <h4>Genres</h4>
          {genres}
        </p>
        <a
          style={{ textDecoration: 'none' }}
          href={props.artist.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
        >
          {props?.artist.name} Profile
        </a>
        <img
          style={{
            border: '1px solid white',
            borderRadius: '1rem',
            justifyContent: 'right',
          }}
          src={props?.artist.images[2].url}
          alt="artist profile"
        />
      </StyledRelatedArtists>
    </>
  );
};
export default RelatedArtist;
