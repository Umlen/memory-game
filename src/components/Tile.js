import { useState } from 'react';
import '../style/tile.css';

function Tile(props) {
    const [isOpened, setIsOpened] = useState(false);

    function tileOpeningHandler(e) {
        setIsOpened(true);
        console.log(e.currentTarget);
    }

    function countOpenedTiles() {

    }

    if (isOpened) {
        return (
            <div className='game-tile opened-tile'>
                <p className='tile-text'>{props.tileText}</p>
            </div>
        );
    } else {
        return (
            <div className='game-tile closed-tile' onClick={(e) => tileOpeningHandler(e)}>
                <p className='tile-text'>{props.tileText}</p>
            </div>
        );
    }
}

export default Tile;