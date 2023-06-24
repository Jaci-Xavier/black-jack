import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import { LoginContext } from '../context/LoginProvider';
import { GameContext } from '../context/GameProvider';
import hiddenCard from '../images/cardsBase.png';

function Game() {
  const { deck } = useContext(LoginContext);
  const { setWins, setLosses } = useContext(GameContext);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);

  const shuffleDeck = () => {
    const deckCopy = deck.slice();
    const magicNumber = 0.5;
    deckCopy.sort(() => Math.random() - magicNumber);
    setShuffledDeck(deckCopy);
  };

  const hitCardForPlayer = () => {
    const player = shuffledDeck.shift();
    setPlayerCards((prevPlayerCards) => [...prevPlayerCards, player]);
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
      setWins((prevWins) => prevWins + 1);
    } else if (result === 'Computer') {
      setLosses((prevLosses) => prevLosses + 1);
    }

    console.log(`The winner is ${result}`);
    return result;
  };

  const stand = () => {
    const computer = shuffledDeck.slice(0, 1);
    setShuffledDeck(shuffledDeck.slice(1));
    setComputerCards((prevComputerCards) => [...prevComputerCards, ...computer]);
    checkWinner();
  };

  const modifyCardValues = () => {
    const modifiedDeck = deck.map((card) => {
      if (card.value === 'king' || card.value === 'queen' || card.value === 'jack') {
        return { ...card, value: 10 };
      } if (card.value === 'ace') {
        return { ...card, value: 11 };
      }
      return card;
    });

    setShuffledDeck(modifiedDeck);
  };

  const playGame = () => {
    modifyCardValues();
    shuffleDeck();
    console.log('Jogo iniciado');
  };

  useEffect(() => {
    const initialPlayerCards = () => {
      const player = shuffledDeck.splice(0, 2);
      setPlayerCards(player);
      console.log('Cartas do jogador', player);
    };

    const initialComputerCards = () => {
      const computer = shuffledDeck.splice(0, 2);
      setComputerCards(computer);
      console.log('Cartas do computador', computer);
    };

    if (shuffledDeck.length > 0) {
      initialPlayerCards();
      initialComputerCards();
    }
  }, [shuffledDeck]);

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
                <div>
                  <img src={ hiddenCard } alt="Carta do Computador" />
                </div>
              ) : (
                <div>
                  <img src={ card.image } alt="Carta do Computador" />
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={ () => playGame() }>Jogar</button>
        <button type="button" onClick={ () => hitCardForPlayer() }>Comprar</button>
        <button type="button" onClick={ () => stand() }>Finalizar Jogada</button>
      </section>
    </div>
  );
}

export default Game;
