import styled from 'styled-components/macro';

const StyledArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 2fr));
  grid-gap: 0rem;
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
  align-items: center;
  margin: 2vw;
  text-align: center;
  padding: 0rem;

  .image-tile {
    display: grid;
    text-align: left;
    align-items: left;
    max-width: 100px;
    min-width: 100px;
    margin-top: -6rem;
    list-style: none;
    margin: 20px 10px auto;
    padding: 0rem;
    grid-template-columns: repeat(auto-fill, minmax(100px, 2fr));
    grid-gap: 0rem;
    object-fit: contain;
    justify-content: center;
    border: 1px solid #eaeaea;
    border-radius: 1px;
  }

  .artist_tag {
    color: white;
    font-size: 1.5rem;
  }
  .artist_image {
    margin: 2px auto;
    border-radius: 75%;
    display: flex;
    width: 10%;
    height: 50%;
  }
  .artist_link {
    color: black;
    text-decoration: none;
    margin: 0px;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    background-color: ghostwhite;
    padding: 0.5rem;
    border-radius: 1rem;
    width: 50%;
  }

  .container {
    display: flex;
    flex-direction: column;
    padding: 0rem;
    align-items: center;
    color: red;
  }
  h4 {
    font-size: 1.2rem;
  }
  img:hover {
    transform: scale(1.5);
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 3px 0 ghostwhite;
    object-fit: cover;

    @media (max-width: 768px) {
      transform: scale(1.2);
      transition: all 0.3s ease-in-out;
      box-shadow: 0 0 3px 0 ghostwhite;
      object-fit: cover;
      h4 {
        font-size: 0.8rem;
      }
    }
  }
`;

export default StyledArtistGrid;
