import { useState, useEffect } from 'react';
import '../style/players.css';
import SinglePlayerEndGame from './SinglePlayerEndGame';

function SinglePlayer(props) {
    const [timer, setTimer] = useState('0:00');
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(    
        function timeCounting() {
            if (props.timerState) {
                setTimeout(() => {
                    const min = minutes + Math.floor((seconds + 1) / 60);
                    const sec = Math.round((seconds + 1) % 60);
                    setSeconds(sec);
                    setMinutes(min);
                    setTimer(`${min}:${sec < 10 ? '0' + sec : sec}`);
                }, 1000);
            }
        }, 
    [props.timerState, timer]);

    return (
        <div className='players-board'>
            {
                props.isGameEnd ? 
                    <SinglePlayerEndGame 
                        timer={timer} 
                        moves={props.moves} 
                        newGame={props.newGame} 
                    /> 
                : ''
            }
            <div className='player-wrapper'>
                <p>Timer</p>
                <p className='player-stats'>{timer}</p>
            </div>
            <div className='player-wrapper'>
                <p>Moves</p>
                <p className='player-stats'>{props.moves}</p>
            </div>
        </div>
    );
}

export default SinglePlayer;