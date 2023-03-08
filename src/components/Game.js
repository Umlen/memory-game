import '../style/game.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman } from '@fortawesome/free-solid-svg-icons';
import Tile from './Tile';

function Game(props) {
    const {theme, players, size} = props.gameOptions;
    const iconsArray = [faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman];

    function renderTiles() {
        return createTilesArray().map((item, key) => (
            <Tile key={key} tileText={item} />
        ));
    }    

    function createTilesArray() {
        const arrayLength = size * size / 2;
        const tilesArray = Array.from({length: arrayLength}, (item, index) => (
            theme === 'numbers' ? index + 1 :
            <FontAwesomeIcon icon={iconsArray[index]} />
        ));
        return shuffleTilesArray(tilesArray.concat(tilesArray));
    };

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
    )
}

export default Game;