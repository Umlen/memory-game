import '../style/players.css';

function SinglePlayerEndGame(props) {
    return (
        <div className='blackout'>
            <div className='end-game-block'>
                <h1 className='win-header'>You did it!</h1>
                <h2 className='win-subheader'>Game over! Here’s how you got on…</h2>
                <div className='player-wrapper'>
                    <p>Time Elapsed</p>
                    <p className='player-stats'>{props.timer}</p>
                </div>
                <div className='player-wrapper'>
                    <p>Moves Taken</p>
                    <p className='player-stats'>{props.moves} Moves</p>
                </div>
                <div className='buttons-wrapper'>
                    <button className='basic-button orange-button restart-button' onClick={props.restartGame}>
                        Restart
                    </button>
                    <button className='basic-button gray-button' onClick={props.newGame}>
                        Setup New Game
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SinglePlayerEndGame;