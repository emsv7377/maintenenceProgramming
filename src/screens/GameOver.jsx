import React from 'react';


import ReactModal from 'react-modal';

function GameOver({ finalScore, gameover }) {
   return(
        <>
        <ReactModal 
            gameover={gameover}
            contentLabel='pop up'>
            <h4>Game Over</h4>
               <span className='centerScreen title'>Game Over</span>
               <span className='centerScreen score'>Score: {finalScore} </span>
               <span className='centerScreen pressEnter'>Press enter to continue!</span>
               </ReactModal>
               </>
    )
   }

export default GameOver;
