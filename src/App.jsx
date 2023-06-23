import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route exact path="/game" element={ <Game /> } />
    </Routes>
  );
}

export default App;
