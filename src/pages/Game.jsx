import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { LoginContext } from '../context/LoginProvider';
import { GameContext } from '../context/GameProvider';

function Game() {
  const { deck } = useContext(LoginContext);
  const { wins, setWins, losses, setLosses } = useContext(GameContext);
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

  const hitCardForPlayer = () => {
    const player = shuffledDeck.slice(0, 1);
    setShuffledDeck(shuffledDeck.slice(1));
    setPlayerCards(player);
  };

  const checkWinner = () => {
    const playerScore = playerCards.reduce((acc, curr) => acc + curr.value, 0);
    const computerScore = computerCards.reduce((acc, curr) => acc + curr.value, 0);
    const magicNumber = 21;

    let result;
    if (playerScore > magicNumber) {
      result = 'Computer';
    } else if (computerScore > magicNumber) {
      result = 'Player';
    } else if (playerScore > computerScore) {
      result = 'Player';
    } else if (computerScore > playerScore) {
      result = 'Computer';
    } else {
      result = 'Draw';
    }

    if (result === 'Player') {
      setWins(wins + 1);
    } else if (result === 'Computer') {
      setLosses(losses + 1);
    }

    console.log(`The winner is ${result}`);
    return result;
  };

  const stand = () => {
    const computer = shuffledDeck.slice(0, 1);
    setShuffledDeck(shuffledDeck.slice(1));
    setComputerCards(computer);
    checkWinner();
  };

  const playGame = () => {
    initialPlayerCards();
    initialComputerCards();
  };

  return (
    <div>
      <Header />
      <section>
        <div>
          {playerCards.map((card, index) => (
            <div key={ index }>
              <div>
                <img src={ card.image } alt="Carta do Jogador" />
              </div>
            </div>
          ))}
        </div>
        <div>
          {computerCards.map((card, index) => (
            <div key={ index }>
              {index === 0 ? (
                <div>Carta Oculta</div>
              ) : (
                <div>
                  <img src={ card.image } alt="Carta do Computador" />
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={ () => shuffleDeck() }>Embaralhar</button>
        <button type="button" onClick={ () => playGame() }>Jogar</button>
        <button type="button" onClick={ () => hitCardForPlayer() }>Comprar</button>
        <button type="button" onClick={ () => stand() }>Finalizar Jogada</button>
      </section>
    </div>
  );
}

export default Game;
