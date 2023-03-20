import { useState, useEffect } from 'react';
import SinglePlayerEndGame from './SinglePlayerEndGame';

function SinglePlayer(props) {
    const [timer, setTimer] = useState('0:00');
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(    
        function timeCounting() {
            if (props.timerState) {
                const timerId = setTimeout(() => {
                    const min = minutes + Math.floor((seconds + 1) / 60);
                    const sec = Math.round((seconds + 1) % 60);
                    setSeconds(sec);
                    setMinutes(min);
                    setTimer(`${min}:${sec < 10 ? '0' + sec : sec}`);
                }, 1000);
                return () => clearTimeout(timerId);
            } else if (!props.isGameStart && timer !== '0:00') {
                setTimer('0:00');
                setSeconds(0);
                setMinutes(0);
            }
        }, 
    [props.timerState, props.isGameStart, timer]);

    return (
        <div className='players-container'>
            {
                props.isGameEnd && 
                <SinglePlayerEndGame 
                    timer={timer} 
                    moves={props.moves} 
                    newGame={props.newGame} 
                    restartGame={props.restartGame}
                /> 
            }
            <div className='player-wrapper player-wrapper-single'>
                <p>Timer</p>
                <p className='player-stats'>{timer}</p>
            </div>
            <div className='player-wrapper player-wrapper-single'>
                <p>Moves</p>
                <p className='player-stats'>{props.moves}</p>
            </div>
        </div>
    );
}

export default SinglePlayer;