import '../style/game.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman } from '@fortawesome/free-solid-svg-icons';
import Tile from './Tile';

function Game(props) {
    const {theme, players, size} = props.gameOptions;
    const iconsArray = [faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman];
    const numbersArray = Array.from({length: 18}, (item, index) => index + 1);
    
    function renderTiles() {
        const arrayLength = size * size / 2;
        const tilesArray = theme === 'numbers' ? 
            createTilesNumbersArray(arrayLength) : 
            createTilesIconsArray(arrayLength);
        return tilesArray.map((tile, key) => (
            <Tile key={key} tileObject={tile} />
        ));
    }   
    
    function createTilesNumbersArray(arrayLength) {
        const tilesNumbersArray = [];
        for (let i = 0; i < arrayLength; i++) {
            tilesNumbersArray.push(
                {
                    data: numbersArray[i],
                    isOpened: false,
                    element: numbersArray[i]
                }
            );
        }
        return shuffleTilesArray(tilesNumbersArray.concat(tilesNumbersArray));
    }

    function createTilesIconsArray(arrayLength) {
        const tilesIconsArray = [];
        for (let i = 0; i < arrayLength; i++) {
            tilesIconsArray.push(
                {
                    data: iconsArray[i].iconName,
                    isOpened: false,
                    element: <FontAwesomeIcon icon={iconsArray[i]} />
                }
            );
        }
        return shuffleTilesArray(tilesIconsArray.concat(tilesIconsArray));
    }

    function shuffleTilesArray(tilesArray) {
        const tilesArrayLength = tilesArray.length;
        const shuffledArray = [];
        for (let i = 0; i < tilesArrayLength; i++) {
            const index = Math.floor(Math.random() * tilesArray.length);
            shuffledArray.push(...tilesArray.splice(index, 1))
        }
        return shuffledArray;
    }

    return (
        <div className='container game-container'>
            <h1>Game</h1>
            <div className={`game-field ${size === '4' ? 'game-field-four' : 'game-field-six'}`}>
                {renderTiles()}
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