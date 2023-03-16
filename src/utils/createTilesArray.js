import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman } from '@fortawesome/free-solid-svg-icons';

const iconsArray = [faCoffee, faSplotch, faCar, faHamburger, faBus, faFish, faBook, faCat, faBell, faDog, faDice, faGlobe, faHouse, faHeart, faDove, faTree, faFire, faSnowman];
const numbersArray = Array.from({length: 18}, (item, index) => index + 1);

function createTilesArray(theme, size) {
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

export default createTilesArray;