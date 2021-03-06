import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../common/Colors';
import { AuthContext } from '../context';

const NavBarItems = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  display: inline;
  width: 150px;
  height: 50px;
  margin-left: 60px;
  margin-top: 7px;
  background: white !important;
  background: black;
  border: 2px solid white;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
  }
`;

//Might add this component later. Keep it for now because the login/register control might be useful.

function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  async function handleLogout() {
    await auth.logout();
  }

  return (
    <nav
      className="navbar"
      style={{ background: `${Colors.white}`, height: '65px', width: '100%' }}
    >
      <div className="navbar-brand">
        <a
          href="https://blackinnovationalliance.com/"
          style={{ display: 'flex', alignItems: 'left' }}
        >
          <Avatar src={process.env.PUBLIC_URL + '/img/BIA.png'} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
