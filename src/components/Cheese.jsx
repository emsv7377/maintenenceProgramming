/**
 * File: Cheese.jsx 
 * 
 * This file returns an image of cheese
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */
import React, {useState} from "react";

function Cheese(gameboard) {



  
// Function that checks the gameboard for cheese that has not yet been eaten
// 
// Function that checks the gameboard for cheese that has not yet been eaten
// 

    return(
        <img 
        src="cheese.svg"
        alt="cheese"
        style={{
            width: '50%',
            height: '50%'
        }}
        />
    )
}

function cheeseCount (gameboard)  {
  let count = 0;
  gameboard.forEach(row => {
    row.forEach(cell => {
      if (cell.cellValue === 'cheese') {
        count++;
      }
    });
  });
  return count;
}

function isCheeseEaten(gameboard,x,y){
  let cell = gameboard[y][x]
  // If cell value is empty or rat, then the cheese is eaten 
  if (cell && cell.cellValue === 'empty' || cell && cell.cellValue === 'rat'){
    return true;
  }
  return false;
}

export {cheeseCount, isCheeseEaten};


export default Cheese;