import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import './index.css';
import LoginProvider from './context/LoginProvider';
import GameProvider from './context/GameProvider';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <LoginProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </LoginProvider>
  </BrowserRouter>,
);
