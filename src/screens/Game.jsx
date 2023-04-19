import React, { useState, useEffect } from "react";
import GameBoard from '../components/GameBoard';
import Brick from '../components/Brick';
import Tutorial from './Tutorial';
import Animate from '../components/Animate'

// Renders the game 
const Game = () => {

    const [gameover, setGameover] = useState(false);

    return(
        <>
        <GameBoard width={13} height={11}>
        </GameBoard>
        <div>
            <Animate></Animate>
        </div>
        </>
    )

}
export default Game;
