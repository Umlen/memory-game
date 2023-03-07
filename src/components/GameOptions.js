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
                        className='option-radio'
                        checked={theme === 'numbers'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='theme-numbers' className='option-label'>Numbers</label>
                    <input 
                        type='radio' 
                        id='theme-icons' 
                        name='theme' 
                        value='icons'
                        className='option-radio'
                        checked={theme === 'icons'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='theme-icons' className='option-label'>Icons</label>
                </div>

                <p className='option-name'>Numbers of Players</p>
                    <div className='options-flex-wrapper'>
                        <input 
                            type='radio'
                            id='players-one'
                            name='players'
                            value='1'
                            className='option-radio'
                            checked={players === '1'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-one' className='option-label'>1</label>
                        <input 
                            type='radio'
                            id='players-two'
                            name='players'
                            value='2'
                            className='option-radio'
                            checked={players === '2'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-two' className='option-label'>2</label>
                        <input 
                            type='radio'
                            id='players-three'
                            name='players'
                            value='3'
                            className='option-radio'
                            checked={players === '3'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-three' className='option-label'>3</label>
                        <input 
                            type='radio'
                            id='players-four'
                            name='players'
                            value='4'
                            className='option-radio'
                            checked={players === '4'}
                            onChange={(e) => props.gameOptionsHandler(e)}
                        />
                        <label htmlFor='players-four' className='option-label'>4</label>
                    </div>

                <p className='option-name'>Grid Size</p>
                <div className='options-flex-wrapper'>
                    <input 
                        type='radio' 
                        id='size-four' 
                        name='size' 
                        value='4' 
                        className='option-radio'
                        checked={size === '4'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='size-four' className='option-label'>4x4</label>
                    <input 
                        type='radio' 
                        id='size-six' 
                        name='size' 
                        value='6'
                        className='option-radio'
                        checked={size === '6'}
                        onChange={(e) => props.gameOptionsHandler(e)}
                    />
                    <label htmlFor='size-six' className='option-label'>6x6</label>
                </div>
                <button onClick={props.startGame} className='start-button'>
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default GameOptions;