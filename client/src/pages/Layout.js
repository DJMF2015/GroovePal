import { Outlet } from 'react-router-dom';
import StyledHeader from '../styles/StyledHeader';
const Layout = () => {
  return (
    <>
      <StyledHeader type="user">
        <div className="header__inner"></div>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Layout;
