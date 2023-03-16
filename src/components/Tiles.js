import '../style/tile.css';
import { useState, useEffect } from 'react';

function Tiles(props) {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        setTiles(props.tilesArray);
    }, [props.tilesArray]);

    return (
        tiles.map((tile, key) => {
            if (tile.tileStatus === 'opened') {
                return (
                    <div key={key} className='game-tile opened-tile' id={tile.id}>
                        <p className='tile-text'>{tile.element}</p>
                    </div>
                );
            } else if (tile.tileStatus === 'matched') {
                return (
                    <div 
                        key={key} 
                        className='game-tile matched-tile' 
                        id={tile.id} 
                    >
                        <p className='tile-text'>{tile.element}</p>
                    </div>
                );
            } else if (tile.tileStatus === 'closed') {
                return (
                    <div 
                        key={key} 
                        className='game-tile closed-tile' 
                        id={tile.id} 
                        onClick={(e) => props.openingHandler(e)}
                    >
                        <p className='tile-text'>{tile.element}</p>
                    </div>
                );
            }
        })
    );
}

export default Tiles;