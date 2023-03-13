import '../style/game.css';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman } from '@fortawesome/free-solid-svg-icons';
import Tiles from './Tiles';

function Game(props) {
    const {theme, players, size} = props.gameOptions;
    const iconsArray = [faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman];
    const numbersArray = Array.from({length: 18}, (item, index) => index + 1);

    function createTilesArray() {
        const arrayLength = size * size / 2;
        const tiles = theme === 'numbers' ? 
            createTilesNumbersArray(arrayLength) : 
            createTilesIconsArray(arrayLength);
        return setId(tiles);
    }

    function setId(array) {
        return array.map(item => {
            return {
                ...item,
                id: uuid()
            };
        });
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

    return (
        <div className='container game-container'>
            <h1>Game</h1>
            <div className={`game-field ${size === '4' ? 'game-field-four' : 'game-field-six'}`}>
                <Tiles tilesArray={createTilesArray()} />
            </div>
            <p>Theme: {theme}</p>
            <p>Players: {players}</p>
            <p>Size: {size}</p>
            <button onClick={props.newGame}>
                New Game
            </button>
        </div>
    );
}

export default Game;