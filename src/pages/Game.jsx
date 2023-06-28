import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import { LoginContext } from '../context/LoginProvider';
import { GameContext } from '../context/GameProvider';
import hiddenCard from '../images/cardsBase.png';

function Game() {
  const { deck, isDarkMode } = useContext(LoginContext);
  const { setWins, setLosses } = useContext(GameContext);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const shuffleDeck = (d) => {
    const deckCopy = d.slice();
    const magicNumber = 0.5;
    deckCopy.sort(() => Math.random() - magicNumber);
    return deckCopy;
  };

  const addCardToComputer = () => {
    const newPlayerScore = playerCards.reduce((acc, curr) => acc + curr.value, 0);
    const newComputerScore = computerCards.reduce((acc, curr) => acc + curr.value, 0);
    const magicNumber = 21;

    if (newComputerScore < magicNumber && newComputerScore <= newPlayerScore) {
      const computer = shuffledDeck.shift();
      setComputerCards((prevComputerCards) => [...prevComputerCards, computer]);
    }
  };

  const hitCardForPlayer = () => {
    const player = shuffledDeck.shift();
    setPlayerCards((prevPlayerCards) => {
      const newPlayerCards = [...prevPlayerCards, player];
      console.log(newPlayerCards);
      addCardToComputer();
      console.log(computerCards);
      return newPlayerCards;
    });
  };

  const mapAndConvertValues = (cards) => {
    return cards.map((card) => {
      const value = parseInt(card.value, 10);
      if (Number.isNaN(value)) {
        if (card.value.toUpperCase() === 'KING'
            || card.value.toUpperCase() === 'QUEEN'
            || card.value.toUpperCase() === 'JACK') {
          return { ...card, value: 10 };
        } if (card.value.toUpperCase() === 'ACE') {
          return { ...card, value: 11 };
        }
      }
      return { ...card, value };
    });
  };

  const sumCards = (player, computer) => {
    const modifiedPlayerCards = mapAndConvertValues(player);
    const modifiedComputerCards = mapAndConvertValues(computer);

    const pS = modifiedPlayerCards.reduce((acc, curr) => acc + curr.value, 0);
    const cs = modifiedComputerCards.reduce((acc, curr) => acc + curr.value, 0);

    setPlayerScore(pS);
    setComputerScore(cs);
  };

  const checkWinner = () => {
    const magicNumber = 21;
    sumCards(playerCards, computerCards);

    if (playerScore > magicNumber) {
      console.log('Player busts');
      setLosses((prevLosses) => prevLosses + 1);
      return 'Computer';
    }

    if (computerScore > magicNumber) {
      console.log('Computer busts');
      setWins((prevWins) => prevWins + 1);
      return 'Player';
    }

    if (playerCards.length === 2 && playerScore === magicNumber) {
      console.log('Player has Blackjack');
      setWins((prevWins) => prevWins + 1);
      return 'Player';
    }

    if (computerCards.length === 2 && computerScore === magicNumber) {
      console.log('Computer has Blackjack');
      setLosses((prevLosses) => prevLosses + 1);
      return 'Computer';
    }

    if (playerScore > computerScore) {
      console.log('Player wins');
      setWins((prevWins) => prevWins + 1);
      return 'Player';
    }

    if (computerScore > playerScore) {
      console.log('Computer wins');
      setLosses((prevLosses) => prevLosses + 1);
      return 'Computer';
    }

    if (playerScore === computerScore) {
      console.log('Draw');
      return 'Draw';
    }
  };

  const playGame = () => {
    setShuffledDeck(shuffleDeck(deck));
    setGameStarted(true);
    console.log('Jogo iniciado');
  };

  const stand = () => {
    if (gameStarted) {
      setGameStarted(false);
      checkWinner();
    }
  };

  useEffect(() => {
    if (shuffledDeck.length > 0 && gameStarted) {
      const player = shuffledDeck.splice(0, 2);
      setPlayerCards(player);
      console.log('Cartas do jogador', player);

      const computer = shuffledDeck.splice(0, 2);
      setComputerCards(computer);
      console.log('Cartas do computador', computer);
    }
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledDeck, gameStarted, isDarkMode]);

  useEffect(() => {
    if (shuffledDeck.length > 0 && gameStarted) {
      const player = shuffledDeck.splice(0, 2);
      setPlayerCards(player);
      console.log('Cartas do jogador', player);

      const computer = shuffledDeck.splice(0, 2);
      setComputerCards(computer);
      console.log('Cartas do computador', computer);

      sumCards(player, computer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledDeck, gameStarted]);

  return (
    <div>
      <Header />
      <section>
        <div>
          <h1>Player</h1>
          {playerCards.map((card, index) => (
            <div key={ index }>
              <div>
                <img src={ card.image } alt="Carta do Jogador" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1>Computador</h1>
          {computerCards.map((card, index) => (
            <div key={ index }>
              <div>
                {index === 0 && gameStarted ? (
                  <img src={ hiddenCard } alt="Carta do Computador" />
                ) : (
                  <img src={ card.image } alt="Carta do Computador" />
                )}
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={ () => playGame() } disabled={ gameStarted }>
          Jogar
        </button>

        <button
          type="button"
          onClick={ () => hitCardForPlayer() }
          disabled={ !gameStarted }
        >
          Comprar
        </button>

        <button type="button" onClick={ () => stand() } disabled={ !gameStarted }>
          Finalizar Jogada
        </button>

      </section>
    </div>
  );
}

export default Game;
