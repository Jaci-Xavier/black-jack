import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext();

function GameProvider({ children }) {
  const obj = { wins: 0, losses: 0 };
  const [wins, setWins] = useState(obj.wins);
  const [losses, setLosses] = useState(obj.losses);

  const values = useMemo(() => ({
    wins,
    setWins,
    losses,
    setLosses,
  }), [wins, setWins, losses, setLosses]);
  return (
    <GameContext.Provider value={ values }>
      {children}
    </GameContext.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameProvider;
