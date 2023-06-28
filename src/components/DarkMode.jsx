import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import '../style/App.css';

function DarkMode() {
  const { isDarkMode, setIsDarkMode } = useContext(LoginContext);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div id="dark-mode-container">
      <button
        onClick={ handleDarkMode }
      >
        <img
          src={ isDarkMode ? sun : moon }
          alt="Theme Icon"
          className="dark-mode-icon"
        />
      </button>
    </div>
  );
}

export default DarkMode;
