import { useState, useEffect } from 'react';
import '../style/game.css';
import logo from '../images/dark-logo.svg';
import createTilesArray from '../utils/createTilesArray';
import Tiles from './Tiles';
import SinglePlayer from './SinglePlayer';

function Game(props) {
    const {theme, players, size} = props.gameOptions;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mobileWidthBreakpoint = 500;
    const [moves, setMoves] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        setTiles(createTilesArray(theme, size));
    }, []);
   
    useEffect(() => {
        function resizeWindowHandler() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', resizeWindowHandler);
        return(() => window.removeEventListener('resize', resizeWindowHandler));
    }, []);

    function movesCounting() {
        setMoves(prevMoves => prevMoves + 1);
    }

    function timerToggler(isGameEnd) {
        if (!isTimerOn) {
            setIsTimerOn(true);
        } else if (isGameEnd) {
            setIsTimerOn(false);
        }
    }

    return (
        <div className='container game-container'>
            <header className='game-page-header'>
                <object type='image/svg+xml' data={logo} title='logo'></object>
                {windowWidth < mobileWidthBreakpoint ? <button className='basic-button orange-button'>Menu</button> :
                    <div>
                        <button className='basic-button orange-button restart-button'>Restart</button>
                        <button className='basic-button gray-button' onClick={props.newGame}>New Game</button>
                    </div>
                }
            </header>
            <div className={`game-field ${size === '4' ? 'game-field-four' : 'game-field-six'}`}>
                <Tiles 
                    tilesArray={tiles} 
                    movesCounting={movesCounting} 
                    timerToggler={timerToggler}
                />
            </div>
            {players === '1' ? <SinglePlayer moves={moves} timerState={isTimerOn} newGame={props.newGame} /> : ''}
        </div>
    );
}

export default Game;