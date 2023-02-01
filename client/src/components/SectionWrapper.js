import { Link } from 'react-router-dom';
import { StyledSection } from '../styles';

const SectionWrapper = ({
  children,
  title,
  seeAllLink,
  breadcrumb,
  seeAllLinks,
  seeAllTracks,
  titleTracks,
  titles,
  seeAllStarred,
  seeStarredTracks,
  seeAllPlaylists,
  titlePlaylists,
}) => (
  <StyledSection>
    <div className="section__inner">
      <div className="section__top">
        <h2 className="section__heading">
          {breadcrumb && (
            <span className="section__breadcrumb">
              <Link to="/">Profile</Link>
            </span>
          )}
          {title && (
            <>
              {seeAllLink && seeAllLinks && seeAllTracks && seeAllStarred ? (
                <>
                  <div
                    style={{
                      marginLeft: '-120px',
                      marginTop: '-20px',
                      fontSize: '22px',
                    }}
                  >
                    <Link to={seeAllLink}>{title}</Link>
                    <Link style={{ marginLeft: '50px' }} to={seeAllLinks}>
                      {titles}
                    </Link>
                    <Link style={{ marginLeft: '50px' }} to={seeAllTracks}>
                      {titleTracks}
                    </Link>
                    <Link style={{ marginLeft: '50px' }} to={seeAllStarred}>
                      {seeStarredTracks}
                    </Link>
                    <Link style={{ marginLeft: '50px' }} to={seeAllPlaylists}>
                      {titlePlaylists}
                    </Link>
                  </div>
                </>
              ) : (
                <span>
                  {title} {titles}
                  {
                    <Link style={{ marginLeft: '50px' }} to={seeAllTracks}>
                      {titleTracks}
                    </Link>
                  }{' '}
                </span>
              )}
            </>
          )}
        </h2>
        {/* {seeAllLink && (
          <Link to={'/'} className="section__see-all">
            See All
          </Link>
        )} */}
      </div>

      {children}
    </div>
  </StyledSection>
);

export default SectionWrapper;
