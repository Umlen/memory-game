import { useState, useEffect } from 'react';
import '../style/game.css';
import logo from '../images/dark-logo.svg';
import createTilesArray from '../utils/createTilesArray';
import Tiles from './Tiles';
import SinglePlayer from './SinglePlayer';

function Game(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mobileWidthBreakpoint = 500;

    const {theme, players, size} = props.gameOptions;
    const [tilesArray, setTilesArray] = useState([]);
    const [isGameOn, setIsGameOn] = useState(false);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        setTilesArray(createTilesArray(theme, size));
    }, []);
   
    useEffect(() => {
        function resizeWindowHandler() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', resizeWindowHandler);
        return(() => window.removeEventListener('resize', resizeWindowHandler));
    }, []);

    function tileOpeningHandler(e) {
        if (countOpenedTiles(tilesArray) === 0) {
            setTilesArray(openOneTile(e.currentTarget.id));
        } else if (countOpenedTiles(tilesArray) === 1) {
            const openedTiles = openOneTile(e.currentTarget.id);
            setTilesArray(openedTiles);
            const checkedTiles = tilesCheck(openedTiles);
            setTimeout(() => setTilesArray(checkedTiles), 1000);
        }
    }

    function countOpenedTiles(tilesArray) {
        const openedTilesArray = tilesArray.filter(tile => tile.tileStatus === 'opened');
        return openedTilesArray.length;
    }

    function openOneTile(currentId) {
        return tilesArray.map(tile => {
            if (tile.id === currentId) {
                return {
                    ...tile, 
                    tileStatus: 'opened',
                };
            } else {
                return tile;
            }
        });
    }

    function tilesCheck(tilesArray) {
        movesCounting();
        const openedTilesArray = tilesArray.filter(tile =>tile.tileStatus === 'opened');
        if (openedTilesArray[0].data === openedTilesArray[1].data) {
            return tilesArray.map(tile => {
                if (tile.tileStatus === 'opened') {
                    return {
                        ...tile, 
                        tileStatus: 'matched',
                    };
                } else {
                    return tile;
                }
            });
        } else {
            return tilesArray.map(tile => {
                if (tile.tileStatus === 'opened') {
                    return {
                        ...tile, 
                        tileStatus: 'closed',
                    };
                } else {
                    return tile;
                }
            });
        }
    }

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
                    tilesArray={tilesArray} 
                    openingHandler={tileOpeningHandler}
                />
            </div>
            {players === '1' ? <SinglePlayer moves={moves} timerState={isTimerOn} newGame={props.newGame} /> : ''}
        </div>
    );
}

export default Game;