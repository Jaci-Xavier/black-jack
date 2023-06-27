import React from 'react';
import LoginProvider from '../context/LoginProvider';
import '../images/sun.svg';
import '../images/moon.svg';

function DarkMode() {
  const { isDarkMode, setIsDarkMode } = useContext(LoginProvider);
  const handleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div>
      <button onClick={ handleDarkMode }>
        <img src="" alt="" />
      </button>
    </div>
  );
}

export default DarkMode;
