import * as React from 'react';
import { useNavigate } from 'react-router-dom';
export default function BackButton({ onClick }) {
  const navigate = useNavigate();
  const styles = {
    button: {
      color: 'white',
      backgroundColor: 'black',
      border: '1px solid white',
      padding: '1rem',
      width: '10rem',
      margin: '1em 8em -5em',
      marginTop: '-3em',
      font: 'Roboto',
      fontSize: '1rem',
    },
  };

  return (
    <button style={styles.button} onClick={() => navigate(-1)}>
      Go Back
    </button>
  );
}
