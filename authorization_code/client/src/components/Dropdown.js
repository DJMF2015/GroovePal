import React, { useState, useEffect } from 'react';

export default function GenreDropDown(props) {
  const [genres, setGenres] = useState([]);

  console.log(props.genre);
  useEffect(() => {
    let genres = props.genre.map((genre) => {
      return genre;
    });
    genres.unshift(' ');
    setGenres(genres);
  }, [props.genre]);

  const setFilteredGenre = (e) => {
    props.setFilteredGenre(e.target.value);
  };
  return (
    <div>
      <select
        style={{
          margin: '0 auto',
          padding: '10px',
          width: '300px',
          height: '50px',
          fontSize: '18px',
          marginTop: '1em',
          backgroundColor: 'red',
          color: 'white',
          border: '3px solid black',
          borderRadius: '10px',
        }}
        onChange={setFilteredGenre}
      >
        {genres.map((option) => (
          <option key={option}>{option[0]}</option>
        ))}
      </select>
    </div>
  );
}
