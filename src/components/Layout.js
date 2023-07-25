import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: black;
  margin: 10px;

  &.active {
    color: red;
  }
`;

export const Layout = () => {
  return (
    <div>
      <header>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
