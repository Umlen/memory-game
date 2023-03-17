import { useState } from 'react';
import '../style/multiplayer.css';

function MultiPlayer(props) {
    const [turn, setTurn] = useState(1);
    const playersEl = [];

    for (let i = 0; i < props.players; i++) {
        playersEl.push(
            <div className='player-wrapper' id={i + 1}>
                <p>
                    {
                        props.windowWidth > props.mobileWidthBreakpoint ? `Player ${i + 1}` : `P${i + 1}`
                    }
                </p>
                <p className='player-stats'>0</p>
            </div>
        );
    }

    return (
        <div className='players-wrapper'>
            {playersEl}
        </div>
    );
}

export default MultiPlayer;