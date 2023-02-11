import React, { useState } from 'react';
import useCreatePlaylist from '../hooks/useCreatePlaylist';
import TopTracksButton from '../components/TopTracksButton';

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const { createTopTracksPlaylist } = useCreatePlaylist({ tracks }); // <--- pass tracks as a prop

  return (
    <>
      <div className="background">
        <TopTracksButton
          setTracks={setTracks}
          createTopTracksPlaylist={createTopTracksPlaylist}
        />
      </div>
    </>
  );
};

export default TopTracks;
