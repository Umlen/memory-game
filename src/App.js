import { useState } from 'react';
import './app.css';
import GameOptions from './components/GameOptions';
import Game from './components/Game';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  return (
    <div>
      {isGameStarted ? <Game /> : <GameOptions />}
    </div>
  );
}

export default App;
