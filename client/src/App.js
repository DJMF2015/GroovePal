import './App.css';
import Layout from './pages/Layout';
import styled from 'styled-components/macro';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayList from './pages/UserGenres';
import TopTracks from './pages/TopTracks';
import UserPlaylists from './pages/Playlists';
import Login from './pages/Login';
import { GlobalStyle } from './styles';
import useAuth from './hooks/useAuth';
import ArtistDetailsCard from './components/ArtistCard';
import Likedtracks from './pages/LikedTracks';
import TopArtists from './pages/TopArtists';
function App() {
  const { spotifyToken, profile } = useAuth();
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(spotifyToken);
  }, [spotifyToken]);

  return (
    <>
      {!token ? (
        <>
          <GlobalStyle />
          <Login />
        </>
      ) : (
        <>
          <BrowserRouter>
            <GlobalStyle />

            <StyledLogoutButton onClick={() => (window.location = '/logout')}>
              {' '}
              Logout{' '}
            </StyledLogoutButton>

            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<PlayList profile={profile} />} />
                <Route path="/tracks" element={<TopTracks />} />
                <Route path="/playlists" element={<UserPlaylists />} />
                <Route path="/starred" element={<Likedtracks />} />
                <Route path="/artists" element={<TopArtists />} />
                <Route path="/artists/:id" element={<ArtistDetailsCard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;
export default App;
