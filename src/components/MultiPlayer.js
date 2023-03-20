import { useState, useEffect } from 'react';
import MultiPlayerEndGame from './MultiPlayerEndGame';

function MultiPlayer(props) {
    const [turn, setTurn] = useState(0);
    const [playersArr, setPlayersArr] = useState([]);

    useEffect(function createPlayersArray() {
        if (!props.isGameStart) {
            const newPlayersArr = Array.from({length: props.players}, (item, index) => {
                return {
                    id: index + 1,
                    pairs: 0,
                    isTurn: false
                };
            });
            setPlayersArr(newPlayersArr);
        }
    }, [props.isGameStart]);

    useEffect(function setPairsToPlayer() {
        if (props.pairs > 0) {
            setPlayersArr(prevPlayersArr => prevPlayersArr.map(player => {
                if (player.id === turn) {
                    return {
                        ...player,
                        pairs: player.pairs + 1
                    };
                } else {
                    return {
                        ...player
                    };
                }
            }));
        }
    }, [props.pairs]);

    useEffect(function changeTurn() {
        let newTurn = 0;
        if (props.moves === 0) {
            newTurn = 1;
        } else {
            newTurn = turn === +props.players ? 1 : turn + 1;
        }
        setPlayersArr(prevPlayersArr => prevPlayersArr.map(player => {
            if (player.id === newTurn) {
                return {
                    ...player,
                    isTurn: true
                };
            } else {
                return {
                    ...player,
                    isTurn: false
                };
            }
        }));
        setTurn(newTurn);
    }, [props.moves]);

    return (
        <div className='players-container'>   
            { 
                props.isGameEnd && 
                <MultiPlayerEndGame 
                    playersArr={playersArr}
                    newGame={props.newGame} 
                    restartGame={props.restartGame}
                /> 
            }
            {
                playersArr.map((player, key) => {
                    return (
                        <div 
                            className={player.isTurn ? 'active-player player-wrapper player-wrapper-multi' : 'player-wrapper player-wrapper-multi'} 
                            id={player.id} 
                            key={key}>
                        <p>
                            {
                                props.windowWidth > props.mobileWidthBreakpoint ? 
                                    `Player ${player.id}` : 
                                    `P${player.id}`
                            }
                        </p>
                        <p className='player-stats'>{player.pairs}</p>
                    </div>
                    );
                })
            }
        </div>
    );
}

export default MultiPlayer;