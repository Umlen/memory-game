import { useState, useEffect } from 'react';
import '../style/multiplayer.css';

function MultiPlayer(props) {
    const [turn, setTurn] = useState(0);
    const [playersArr, setPlayersArr] = useState([]);

    useEffect(function createPlayersArray() {
        const newPlayersArr = Array.from({length: props.players}, (item, index) => {
            return {
                id: index + 1,
                pairs: 0,
                isTurn: false
            };
        });
        setPlayersArr(newPlayersArr);
    }, []);

    useEffect(function setPairsToPlayer() {
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
    }, [props.pairs]);

    useEffect(function changeTurn() {
        const newTurn = turn === +props.players ? 1 : turn + 1;
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
        <div className='players-wrapper'>
            {
                playersArr.map((player, key) => {
                    return (
                        <div 
                            className={player.isTurn ? 'active-player player-wrapper' : 'player-wrapper'} 
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