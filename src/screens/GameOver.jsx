import React from 'react';
import { useNavigate } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import pacman from '../assets/pacman.png'
import index from '../index.css?inline';

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
