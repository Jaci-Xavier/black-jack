import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import '../App.css';

function DarkMode() {
  const { isDarkMode, setIsDarkMode } = useContext(LoginContext);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <h1>Black Jack</h1>
      <button
        onClick={ handleDarkMode }
      >
        <img
          src={ isDarkMode ? moon : sun }
          alt="Theme Icon"
          className="dark-mode-icon"
        />
      </button>
    </div>
  );
}

export default DarkMode;
