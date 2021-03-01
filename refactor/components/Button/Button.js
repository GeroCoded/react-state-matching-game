import React from 'react';
import './Button.css';
import GameContext from '../../GameContext';

const Button = () => {
    return (
        <GameContext.Consumer>
            {({ startGame, playing }) => <button onClick={startGame} >{playing ? 'reset' : 'start'}</button>}
        </GameContext.Consumer>
    )
}

export default Button
