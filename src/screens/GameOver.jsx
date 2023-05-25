/**
 * File: Game.jsx 
 * 
 * This file contains logic for the GameOver page 
 * 
 * TODO: (Not working currently) 
 *    Remove fixed text strings to allow translations´
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import React from 'react';

function GameOver({ score }) {

   return(
        <div id='gameOver'>
            <h1>Game Over</h1>
               <span className='centerScreen title'>Game Over</span>
               <span className='centerScreen score'>Score: {score} </span>
               <span className='centerScreen pressEnter'>Press enter to continue!</span>
            </div>
    )
   }

export default GameOver;
//************
// END of file GameOver.jsx 
//************
