import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { LoginContext } from '../context/LoginProvider';

function Game() {
  const { deck } = useContext(LoginContext);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);

  const shuffleDeck = () => {
    const deckCopy = deck.slice();
    const magicNumber = 0.5;
    deckCopy.sort(() => Math.random() - magicNumber);
    setShuffledDeck(deckCopy);
  };

  const initialPlayerCards = () => {
    const player = shuffledDeck.slice(0, 2);
    setShuffledDeck(shuffledDeck.slice(2));
    setPlayerCards(player);
  };

  const initialComputerCards = () => {
    const computer = shuffledDeck.slice(0, 2);
    setShuffledDeck(shuffledDeck.slice(2));
    setComputerCards(computer);
  };

  const playGame = () => {
    initialPlayerCards();
    initialComputerCards();
  };

  return (
    <div>
      <Header />
      <section>
        <button type="button" onClick={ () => shuffleDeck() }>Embaralhar</button>
        <button type="button" onClick={ () => playGame() }>Jogar</button>
      </section>
    </div>
  );
}

export default Game;
