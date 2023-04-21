import styled from 'styled-components/macro';

const StyledRelatedArtists = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin: 2vw;
  text-align: center;
  padding: 0rem;
  border-radius: 1rem;
  border: 1px solid white;
  box-shadow: 4px 1px 10px 0 red;
  transform: scale(0.9);
`;

export default StyledRelatedArtists;
