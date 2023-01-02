import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
export default function UserProfile(props) {
  const { profile } = useAuth();
  console.log({ profile });

  const profiles = () => {
    if (props.profile) {
      return (
        <div>
          <h1> {props.display_name}</h1>
          <a href={props.profile.external_urls.spotify} rel="noreferrer" target="_blank">
            Spotify Profile
          </a>
          <br></br> <br></br>
          <img
            style={{ width: '200px', height: '150px', position: 'relative' }}
            src={props.profile.images[0].url}
            alt="davidf"
          />
        </div>
      );
    }
  };
  return (
    <div>
      {/* <h1> {props.display_name}</h1> */}
      {/* <a href={props.profile.external_urls.spotify} rel="noreferrer" target="_blank">
        Spotify Profile
      </a>
      <br></br> <br></br>
      <img
        style={{ width: '200px', height: '150px', position: 'relative' }}
        src={props.profile.images[0].url}
        alt="davidf"
      /> */}
      {profiles()}
    </div>
  );
}
