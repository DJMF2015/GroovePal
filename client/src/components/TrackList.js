// import { formatDuration } from '../utils/utils';
import StyledTrackList from '../styles/StyledTrackList';
import SpotifyPreview from '../utils/SpotifyPreview';
import React from 'react';

const TrackList = ({ tracks }) => {
  console.log({ tracks });
  return (
    <>
      {tracks && tracks.length ? (
        <StyledTrackList>
          {tracks.map((track, i) => (
            <li className="track__item" key={i}>
              <div className="track__item__num">{i + 1}</div>

              <SpotifyPreview
                style={{
                  width: '400px',
                  height: '90px',
                  border: '1px solid black',
                  overflow: 'none',
                  scroll: 'none',
                  overflowX: 'hidden',
                }}
                link={track.external_urls.spotify}
              />

              <div className="track__item__title-group">
                {track.album.images.length && track.album.images[2] && (
                  <div className="track__item__img">
                    <img src={track.album.images[2].url} alt={track.name} />
                  </div>
                )}

                <div className="track__item__name-artist">
                  <div className="track__item__name overflow-ellipsis">{track.name}</div>
                  <div className="track__item__artist overflow-ellipsis">
                    {track.artists.map((artist, i) => (
                      <span key={i}>
                        {artist.name}
                        {i !== track.artists.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="track__item__album overflow-ellipsis">
                {track.album.name}
              </div>
              <div className="track__item__duration">
                {(track.duration_ms / 100000)
                  .toFixed(2)
                  .replace('.', ':')
                  .concat(' mins')}
              </div>
            </li>
          ))}
        </StyledTrackList>
      ) : (
        <p className="empty-notice">No tracks available</p>
      )}
    </>
  );
};
export default TrackList;
