/**
 * File: Game.jsx 
 * 
 * This file calls the GameBoard with chosen width and height.  
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import GameBoard from '../components/GameBoard';
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
//************
// END of file Game.jsx 
//************