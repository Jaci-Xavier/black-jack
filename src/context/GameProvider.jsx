import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext();

function GameProvider({ children }) {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

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
