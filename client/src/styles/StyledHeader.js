import styled from 'styled-components/macro';

const StyledHeader = styled.header`
  display: flex;
  align-items: flex-end;
  position: relative;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  background-color: var(--grey);
  ul {
    list-style: none;
  }
  li {
    display: inline-flex;
    margin-left: 0em;
    padding: 0px;
    margin-bottom: 3rem;
    font-size: 22px;
    border-radius: 10px;
  }

  li a {
    color: var(--white);
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    border-radius: 20px;
    box-shadow: 10px 5px 15px 10px grey;
    text-decoration: none;
  }

  @media (min-width: 768px) {
    li {
      font-size: 20px;
      padding: 10px;
    }
  }

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 10vh;
    background-color: var(--grey);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), var(--black));
    position: absolute;
    top: 100%;
    z-index: -1;
  }
  .header__inner {
    display: flex;
    align-items: flex-start;
    width: 50%;
    max-width: var(--site-max-width);
    /* margin: 0 auto; */
    @media (min-width: 768px) {
      padding: 1em var(--spacing-xs);
    }
  }
  img.header__img {
    width: 20%;
    max-width: 250px;
    min-width: 120px;
    margin-right: var(--spacing-lg);
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
    background-color: var(--dark-grey);
    border-radius: ${(props) => (props.type === 'user' ? '50%' : '0')};
    @media (min-width: 768px) {
      margin-right: var(--spacing-xl);
    }
  }

  h1.header__name {
    font-size: clamp(2.5rem, 10vw, 6rem); //
    line-height: 1;
    margin: 10px 0 var(--spacing-xs) 0;
    @media (min-width: 768px) {
      margin: 0 0 var(--spacing-xs) -5px;
    }
  }
`;

export default StyledHeader;
