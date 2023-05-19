import React, { useState, useEffect } from "react";
import GameBoard from '../components/GameBoard';
import Brick from '../components/Brick';
import Tutorial from './Tutorial';

// Renders the game 
const Game = () => {

    return(
        <>
            <GameBoard width={15} height={13}>
            </GameBoard>
        </>
    )

}
export default Game;
