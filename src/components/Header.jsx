import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';

function Header() {
  const { login } = useContext(LoginContext);

  return (
    <div>{`Bem vindo ${login.email} !!`}</div>
  );
}

export default Header;
