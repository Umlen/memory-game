function Game(props) {
    const {theme, players, size} = props.gameOptions

    return (
        <div className='container'>
            <h1>Game</h1>
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