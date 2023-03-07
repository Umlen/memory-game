import { useState } from 'react';
import './style/app.css';
import GameOptions from './components/GameOptions';
import Game from './components/Game';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState({
    theme: 'numbers',
    players: '1',
    size: '4'
  });

  function toggleGameState() {
    setIsGameStarted(prevIsGameStarted => !prevIsGameStarted);
  }

  function gameOptionsHandler(e) {
    const {name, value} = e.target;
    setGameOptions(prevGameOptions => {
      return {
        ...prevGameOptions,
        [name]: value
      };
    });
  }

  return (
    <div>
      {isGameStarted ? <Game gameOptions={gameOptions} newGame={toggleGameState} /> : 
        <GameOptions 
          startGame={toggleGameState} 
          gameOptions={gameOptions} 
          gameOptionsHandler={gameOptionsHandler}
        />
      }
    </div>
  );
}

export default App;
