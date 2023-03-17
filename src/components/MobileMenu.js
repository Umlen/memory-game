function MobileMenu(props) {
    return(
        <div className='blackout'>
            <div className='mobile-menu'>
                <button className='basic-button orange-button restart-button'>
                    Restart
                </button>
                <button className='basic-button gray-button' onClick={props.newGame}>
                    New Game
                </button>
                <button className='basic-button gray-button' onClick={props.resumeGame}>
                    Resume Game
                </button>
            </div>
        </div>
    );
}

export default MobileMenu;