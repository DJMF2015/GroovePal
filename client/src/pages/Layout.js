import { Outlet, Link } from 'react-router-dom';
// import '../index.css';
import StyledHeader from '../styles/StyledHeader';
import '../App.css';
const Layout = () => {
  return (
    <>
      {/* <nav> */}
      <StyledHeader type="user">
        <div className="header__inner">
          {/* <ul> */}
          <li>
            <Link to="/">Top Genres</Link>
          </li>
          <li>
            <Link to="/tracks">Top Tracks</Link>
          </li>
          <li>
            <Link to="/artists">Top Artists </Link>
          </li>
          <li>
            <Link to="/playlists">Playlists </Link>
          </li>
          <li>
            <Link to="/saved">Starred Tracks </Link>
          </li>
          {/* </ul> */}
        </div>
      </StyledHeader>
      {/* </nav> */}
      <Outlet />
    </>
  );
};

export default Layout;
