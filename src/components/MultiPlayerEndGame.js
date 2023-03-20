function MultiPlayerEndGame(props) {
    let winners = 0;
    const playersArr = chooseWinner(props.playersArr);

    function chooseWinner(players) {
        const sortedPlayers = players.sort((a, b) => b.pairs - a.pairs);
        const maxPairs = sortedPlayers[0].pairs;
        return sortedPlayers.map(player => {
            if (player.pairs === maxPairs) {
                winners += 1;
                return {
                    ...player,
                    winner: true,
                    classNameStr: 'player-wrapper player-winner'
                };
            } else {
                return {
                    ...player,
                    classNameStr: 'player-wrapper'
                };
            }
        });
    }

    return (
        <div className='blackout'>
            <div className='end-game-block'>
                <h1 className='win-header'>
                    {winners > 1 ? 'It’s a tie!' : `Player ${playersArr[0].id} Wins!`}
                </h1>
                <h2 className='win-subheader'>Game over! Here are the results…</h2>
                {
                    playersArr.map((player, key) => {
                        return (
                            <div key={key} className={player.classNameStr}>
                                <p>Player {player.id} {player.winner && '(winner)'}</p>
                                <p className='player-stats'>{player.pairs} Pairs</p>
                            </div>
                        );
                    })
                }
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

export default MultiPlayerEndGame;