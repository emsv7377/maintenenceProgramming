import React from 'react';
import { useNavigate } from 'react-router-dom';

function GameOver({ finalScore }) {
   return(
        <>
        
            <h2>Game Over </h2>
            <h3>Your score: {finalScore}</h3>
            <button onClick={() => console.log('button pressed')}>Enter</button>
         
         </>
    )
   }

export default GameOver;
