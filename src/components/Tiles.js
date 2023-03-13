import '../style/tile.css';
import { useState } from 'react';

function Tiles(props) {
    const [tiles, setTiles] = useState(props.tilesArray);;

    function tileOpeningHandler(e) {
        if (countOpenedTiles(tiles) < 2) {
            const currentId = e.currentTarget.id;
            const newTilesArray = tiles.map(tile => {
                if (tile.id === currentId) {
                    return {
                        ...tile, 
                        tileStatus: 'opened',
                    };
                } else {
                    return tile;
                }
            });
            setTiles(newTilesArray);
            if (countOpenedTiles(newTilesArray) === 2) {
                tilesCheck(newTilesArray);
            }
        } 
    }

    function countOpenedTiles(tilesArray) {
        const openedTilesArray = tilesArray.filter(tile => tile.tileStatus === 'opened');
        return openedTilesArray.length;
    }

    function tilesCheck(tilesArray) {
        setTimeout(function() {
            const openedTilesArray = tilesArray.filter(tile =>tile.tileStatus === 'opened');
            if (openedTilesArray[0].data === openedTilesArray[1].data) {
                console.log('true');
                const newTilesArray = tilesArray.map(tile => {
                    if (tile.tileStatus === 'opened') {
                        return {
                            ...tile, 
                            tileStatus: 'matched',
                        };
                    } else {
                        return tile;
                    }
                });
                setTiles(newTilesArray);
            } else {
                console.log('false');
                const newTilesArray = tilesArray.map(tile => {
                    if (tile.tileStatus === 'opened') {
                        return {
                            ...tile, 
                            tileStatus: 'closed',
                        };
                    } else {
                        return tile;
                    }
                });
                setTiles(newTilesArray);
            }
        }, 1000);
    }

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
                        onClick={(e) => tileOpeningHandler(e, tiles)}
                    >
                        <p className='tile-text'>{tile.element}</p>
                    </div>
                );
            }
        })
    );
}

export default Tiles;