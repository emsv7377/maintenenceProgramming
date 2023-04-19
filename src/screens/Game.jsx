import React, { useState, useEffect } from "react";
import GameBoard from '../components/GameBoard';
import Brick from '../components/Brick';

/**
 * Handles user input from key presses 
 */
function handleKeyPresses(){
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);

    // Handles arrow key presses
    const handleKeyPress = (event) => {
        switch (event.key) {
            case "ArrowUp":
            setYPos((prevY) => prevY - 10);
            break;
        case "ArrowDown":
            setYPos((prevY) => prevY + 10);
            break;
        case "ArrowLeft":
            setXPos((prevX) => prevX - 10);
            break;
        case "ArrowRight":
            setXPos((prevX) => prevX + 10);
            break;
        default:
            break;
        }
    };

  // Detects arrow key presses
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, []);
}
// Renders the game 
const Game = () => {
    handleKeyPresses();
    const [gameover, setGameover] = useState(false);
    // start position of rat-man
    const ratmanStartPos = 0;

    return(
        <GameBoard width={30} height={30}>
            <Brick style={{
                position: "absolute",
                top: `${yPos}px`,
                left: `${xPos}px`,
                width: "50px",
                height: "50px",
                background: "blue",}}></Brick>
        </GameBoard>
    )

}
export default Game;
