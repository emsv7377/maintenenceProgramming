import React, { useState, useEffect } from "react";
import GameBoard from '../components/GameBoard';
import Brick from '../components/Brick';
import Tutorial from './Tutorial';

// Renders the game 
const Game = () => {

    const [gameover, setGameover] = useState(false);

    return(
        <>
        <GameBoard width={13} height={11}>
        </GameBoard>
        </>
    )

}
export default Game;
