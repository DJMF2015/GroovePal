import { Outlet, Link } from 'react-router-dom';
// import '../index.css';
import '../App.css';
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
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
            <Link to="/saved">Liked Tracks 👍 </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
