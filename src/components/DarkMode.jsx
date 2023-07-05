import React, { useContext, useState, useEffect } from 'react';
import { LoginContext } from '../context/LoginProvider';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import '../style/App.css';

function DarkMode() {
  const { setIsDarkMode } = useContext(LoginContext);
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const [initialDarkMode, setInitialDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode !== null ? JSON.parse(savedDarkMode)
      : prefersColorScheme.matches;
  });

  useEffect(() => {
    setIsDarkMode(initialDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(initialDarkMode));
  }, [initialDarkMode, setIsDarkMode]);

  const handleDarkMode = () => {
    setInitialDarkMode(!initialDarkMode);
  };

  return (
    <div id="dark-mode-container">
      <button
        onClick={ handleDarkMode }
      >
        <img
          src={ initialDarkMode ? sun : moon }
          alt="Theme Icon"
          className="dark-mode-icon"
        />
      </button>
    </div>
  );
}

export default DarkMode;
