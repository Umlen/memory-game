import { useState } from 'react';
import '../style/tile.css';

function Tile(props) {
    const [tile, setTile] = useState(props.tileObject);

    function tileOpeningHandler(e) {
        setTile(prevTile => {
            return {
                ...prevTile, 
                isOpened: !prevTile.isOpened
            }
        });
        console.log(e.currentTarget)
    }

    if (tile.isOpened) {
        return (
            <div className='game-tile opened-tile'>
                <p className='tile-text'>{tile.element}</p>
            </div>
        );
    } else {
        return (
            <div className='game-tile closed-tile' onClick={(e) => tileOpeningHandler(e)}>
                <p className='tile-text'>{tile.element}</p>
            </div>
        );
    }
}

export default Tile;