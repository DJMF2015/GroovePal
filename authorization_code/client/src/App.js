// import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayList from './pages/Playlist';
import TopTracks from './pages/TopTracks';
import UserPlaylists from './pages/Playlists';
import AutomaticPlaylist from './pages/AutomaticPlaylist';
import ArtistDetailsCard from './components/ArtistCard';
import Likedtracks from './pages/LikedTracks';
import TopArtists from './pages/TopArtists';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PlayList />} />
          <Route path="/tracks" element={<TopTracks />} />
          <Route path="/playlists" element={<UserPlaylists />} />
          <Route path="/saved" element={<Likedtracks />} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/artists/:id" element={<ArtistDetailsCard />} />
          {/* <Route path="/automatic" element={<AutomaticPlaylist />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
