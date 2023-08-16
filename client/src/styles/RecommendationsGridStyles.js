import styled from 'styled-components/macro';

const RecommendationsGridStyles = styled.div`
  .range_button_and_preview_grid_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin: 2em auto;
    max-width: 1000px;
  }

  .range_buttons {
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 60%;
    margin: 2em 1em 2em 1em;
    padding: 2em 1em;
    border: 2px solid red;
    border-radius: 2rem;
    line-height: 4;
  }
`;

export default RecommendationsGridStyles;
