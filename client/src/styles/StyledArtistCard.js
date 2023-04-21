import styled from 'styled-components/macro';
export const Img = styled.img`
  margin: 2px auto;
  border-radius: 75%;
  display: flex;
  width: 10%;
  height: 50%;
  box-shadow: 3px 2px 10px 0 ghostwhite;
`;

export const ArtistLink = styled.a`
  color: black;
  text-decoration: none;
  margin: 0;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  background-color: ghostwhite;
  padding: 0.5rem;
  border-radius: 1rem;
  width: 50%;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem;
  align-items: center;
  color: red;
`;

export const ArtistTag = styled.span`
  color: white;
  font-size: 1.5rem;
`;
