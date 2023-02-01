import styled from 'styled-components/macro';

const StyledRangeButtons = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin-top: 8rem;
  button {
    width: 15em;
    margin-left: 60px;
    color: var(--white);
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
        width: 10em;
        color: var(--white);
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
