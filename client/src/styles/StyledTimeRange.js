import styled from 'styled-components/macro';

const StyledRangeButtons = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  /* margin: 0 0 var(--spacing-lg) 0; */
  margin-top: 8em;
  button {
    width: 100px;
    background-color: var(--green);
    &:hover,
    &:focus {
      background-color: var(--green);
    }
    &.active {
      background-color: var(--green);
    }
  }
  padding: 0;
  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    right: var(--spacing-xxl);
    margin-bottom: 60px;
    li {
      margin-right: var(--spacing-xs);
      @media (min-width: 768px) {
        margin-left: var(--spacing-xs);
        margin-right: 0;
      }
      button {
        width: 100px;
        background-color: var(--green);
        &:hover,
        &:focus {
          background-color: var(--green);
        }
        &.active {
          background-color: var(--green);
        }
      }
    }
  }
`;

export default StyledRangeButtons;
