import '../style/game-options.css';
import logo from '../images/light-logo.svg';

function GameOptions(props) {
    const {theme, players, size} = props.gameOptions;

    return (
        <div className='container'>
            <object type='image/svg+xml' data={logo} className='options-page-logo' title='logo'></object>
            <div className='game-options-container'>
                <p className='option-name'>Select Theme</p>
                <div className='options-flex-wrapper'>
                    <input 
                        type='radio' 
                        id='theme-numbers' 
                        name='theme' 
                        value='numbers' 
                        checked={theme === 'numbers'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='theme-numbers'>Numbers</label>
                    <input 
                        type='radio' 
                        id='theme-icons' 
                        name='theme' 
                        value='icons'
                        checked={theme === 'icons'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='theme-icons'>Icons</label>
                </div>

                <p className='option-name'>Numbers of Players</p>
                    <div className='options-flex-wrapper'>
                        <input 
                            type='radio'
                            id='players-one'
                            name='players'
                            value='1'
                            checked={players === '1'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-one'>1</label>
                        <input 
                            type='radio'
                            id='players-two'
                            name='players'
                            value='2'
                            checked={players === '2'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-two'>2</label>
                        <input 
                            type='radio'
                            id='players-three'
                            name='players'
                            value='3'
                            checked={players === '3'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-three'>3</label>
                        <input 
                            type='radio'
                            id='players-four'
                            name='players'
                            value='4'
                            checked={players === '4'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-four'>4</label>
                    </div>

                <p className='option-name'>Grid Size</p>
                <div className='options-flex-wrapper'>
                    <input 
                        type='radio' 
                        id='size-four' 
                        name='size' 
                        value='4' 
                        checked={size === '4'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='size-four'>4x4</label>
                    <input 
                        type='radio' 
                        id='size-six' 
                        name='size' 
                        value='6'
                        checked={size === '6'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='size-six'>6x6</label>
                </div>
                <button onClick={props.startGame}>Start Game</button>
            </div>
        </div>
    );
}

export default GameOptions;