import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman } from '@fortawesome/free-solid-svg-icons';
import '../style/game.css';
import logo from '../images/dark-logo.svg';
import Tiles from './Tiles';
import OnePlayer from './OnePlayer';

function Game(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mobileWidthBreakpoint = 500;
    const [moves, setMoves] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const {theme, players, size} = props.gameOptions;
    const iconsArray = [faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman];
    const numbersArray = Array.from({length: 18}, (item, index) => index + 1);
    
    useEffect(() => {
        function resizeWindowHandler() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', resizeWindowHandler);
        return(() => window.removeEventListener('resize', resizeWindowHandler));
    }, []);

    function createTilesArray() {
        const arrayLength = size * size / 2;
        const tiles = theme === 'numbers' ? 
            createTilesNumbersArray(arrayLength) : 
            createTilesIconsArray(arrayLength);
        return setId(tiles);
    }
   
    function createTilesNumbersArray(arrayLength) {
        const tilesNumbersArray = [];
        for (let i = 0; i < arrayLength; i++) {
            tilesNumbersArray.push(
                {
                    data: numbersArray[i],
                    tileStatus: 'closed',
                    element: numbersArray[i]
                }
            );
        }
        return shuffleArray(tilesNumbersArray.concat(tilesNumbersArray));
    }

    function createTilesIconsArray(arrayLength) {
        const tilesIconsArray = [];
        for (let i = 0; i < arrayLength; i++) {
            tilesIconsArray.push(
                {
                    data: iconsArray[i].iconName,
                    tileStatus: 'closed',
                    element: <FontAwesomeIcon icon={iconsArray[i]} />
                }
            );
        }
        return shuffleArray(tilesIconsArray.concat(tilesIconsArray));
    }

    function shuffleArray(array) {
        const tilesArrayLength = array.length;
        const shuffledArray = [];
        for (let i = 0; i < tilesArrayLength; i++) {
            const index = Math.floor(Math.random() * array.length);
            shuffledArray.push(...array.splice(index, 1))
        }
        return shuffledArray;
    }

    function setId(array) {
        return array.map(item => {
            return {
                ...item,
                id: uuid()
            };
        });
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
                    tilesArray={createTilesArray()} 
                    movesCounting={movesCounting} 
                    timerToggler={timerToggler}
                />
            </div>
            {players === '1' ? <OnePlayer moves={moves} timerState={isTimerOn} newGame={props.newGame} /> : ''}
        </div>
    );
}

export default Game;