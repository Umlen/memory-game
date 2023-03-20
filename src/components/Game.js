import { useState, useEffect } from 'react';
import '../style/game.css';
import '../style/player.css';
import logo from '../images/dark-logo.svg';
import createTilesArray from '../utils/createTilesArray';
import Tiles from './Tiles';
import SinglePlayer from './SinglePlayer';
import MultiPlayer from './MultiPlayer';
import MobileMenu from './MobileMenu';

function Game(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mobileWidthBreakpoint = 500;

    const {theme, players, size} = props.gameOptions;
    const [tiles, setTiles] = useState([]);
    const [isGameStart, setIsGameStart] = useState(false);
    const [isGameEnd, setIsGameEnd] = useState(false);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
    const [moves, setMoves] = useState(0);
    const [pairs, setPairs] = useState(0);
    
    useEffect(() => {
        setTiles(createTilesArray(theme, size));
    }, [theme, size]);
   
    useEffect(() => {
        function resizeWindowHandler() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', resizeWindowHandler);
        return(() => window.removeEventListener('resize', resizeWindowHandler));
    }, []);

    function tileOpeningHandler(e) {
        if (moves === 0 && !isTimerOn) {
            timerToggler();
            setIsGameStart(true);
        }
        if (countOpenedTiles(tiles) === 0) {
            setTiles(openOneTile(e.currentTarget.id));
        } else if (countOpenedTiles(tiles) === 1) {
            const openedTiles = openOneTile(e.currentTarget.id);
            setTiles(openedTiles);
            setTimeout(() => {
                setTiles(tilesCheck(openedTiles));
                gameEndingCheck(openedTiles);
            }, 500);
        }
    }

    function countOpenedTiles(tilesArray) {
        const openedTilesArray = tilesArray.filter(tile => tile.tileStatus === 'opened');
        return openedTilesArray.length;
    }

    function openOneTile(currentId) {
        return tiles.map(tile => {
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
        const openedTilesArray = tilesArray.filter(tile => tile.tileStatus === 'opened');
        if (openedTilesArray[0].data === openedTilesArray[1].data) {
            setPairs(pairs + 1);
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

    function timerToggler() {/*singleplayer only */
        if (players === '1') {
            setIsTimerOn(prevTimerState => !prevTimerState);
        }
    }

    function gameEndingCheck(tilesArray) {
        const matchedTilesArray = tilesArray.filter(tile => tile.tileStatus === 'closed');
        if (matchedTilesArray.length === 0) {
            setIsGameEnd(true);
            timerToggler();
        }
    }

    function mobileMenuHandler() {
        const mobileMenuState = isMobileMenuOpened ? false : true;
        if (isGameStart) {
            timerToggler();
        }
        setIsMobileMenuOpened(mobileMenuState);
    }

    function restartGame() {
        const closedTiles = tiles.map(tile => {
            return {
                ...tile, 
                tileStatus: 'closed',
            };
        });
        setTiles(closedTiles);
        setIsGameStart(false);
        setIsGameEnd(false);
        setIsTimerOn(false);
        setIsMobileMenuOpened(false);
        setMoves(0);
        setPairs(0);
    }

    return (
        <div className='container game-container'>
            <header className='game-page-header'>
                <object type='image/svg+xml' data={logo} title='logo'></object>
                {
                    windowWidth < mobileWidthBreakpoint ? 
                        <button className='basic-button orange-button' onClick={mobileMenuHandler}>
                            Menu
                        </button> :
                        <div>
                            <button className='basic-button orange-button restart-button' onClick={restartGame}>
                                Restart
                            </button>
                            <button className='basic-button gray-button' onClick={props.newGame}>
                                New Game
                            </button>
                        </div>
                }
            </header>
            {
                isMobileMenuOpened && 
                <MobileMenu 
                    newGame={props.newGame} 
                    resumeGame={mobileMenuHandler} 
                    restartGame={restartGame}
                /> 
            }
            <div className={`game-field ${size === '4' ? 'game-field-four' : 'game-field-six'}`}>
                <Tiles 
                    tilesArray={tiles} 
                    openingHandler={tileOpeningHandler}
                />
            </div>
            {
                players === '1' ? 
                    <SinglePlayer 
                        isGameStart={isGameStart}
                        isGameEnd={isGameEnd}
                        moves={moves} 
                        timerState={isTimerOn} 
                        newGame={props.newGame} 
                        restartGame={restartGame}
                    /> 
                : 
                    <MultiPlayer 
                        isGameStart={isGameStart}
                        isGameEnd={isGameEnd}
                        players={players} 
                        moves={moves} 
                        pairs={pairs}
                        newGame={props.newGame} 
                        restartGame={restartGame}
                        mobileWidthBreakpoint={mobileWidthBreakpoint}
                        windowWidth={windowWidth}
                    />
            }
        </div>
    );
}

export default Game;