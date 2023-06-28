import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';
import { GameContext } from '../context/GameProvider';
import DarkMode from './DarkMode';

function Header() {
  const { login } = useContext(LoginContext);
  const { wins, losses } = useContext(GameContext);
  const userName = login.email.split('@').shift();

  return (
    <section>
      <DarkMode />
      <div>{`Bem vindo ${userName}!`}</div>
      <div>{`Vitórias: ${wins}`}</div>
      <div>{`Derrotas: ${losses}`}</div>
    </section>
  );
}

export default Header;
