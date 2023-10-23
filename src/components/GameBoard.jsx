/**
 * File: GameBoard.jsx 
 * 
 * This file contains the game logic of RatMan, which includes navigating the rat,
 * collecting cheese and game over. 
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import React, { useState, useEffect, useContext } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';
import SuperCheese from './SuperCheese'
import Rat from './Rat';
import Cat from './Cat';
import LanguageContext from './LanguageContext';
import useSound from 'use-sound';
import chew from './audio/chew.mp3'
import { useNavigate } from 'react-router-dom';
import { cheeseCount, isCheeseEaten } from './Cheese';



function GameBoard({ width, height }) {
  const [gameboard,setGameboard] = useState([]); // State for gameboard 
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // State for the player's position
  const [open, setOpen] = useState(false) // State for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.
  const [points, setPoints] = useState(0);  // State for player's score 
  const language = useContext(LanguageContext); // State for current language 
  const [finalScore, setFinalScore] = useState(0); // State for final score of player
  const [gameover, setGameover] = useState(false); // State for game over 
  const numCheese = countCheese(gameboard); // state for how much cheese is left on gameboard
  const [gameplay, setGamePlay] = useState(true); // State for when game is playing 
  const [powerUpActive, setPowerUpActive] = useState(false);
  let [timer, setTimer] = useState(0);

  // TODO: change to volume: 0.1 or 0.2 debugging done
  const [playChew] = useSound(chew, {volume:0.1}); // State for sound effect: eatCheese
  const [catPosition, setCatPosition] = useState({x:1, y:8}) // State for cat's position

  const navigation = useNavigate();

  const startTimer = () => {
    var intervalID = setInterval(() => {
      setTimer(timer+=1)
      console.log(timer," Inside setInterval")
      if(timer === 15){
        setPowerUpActive(false);
        clearInterval(intervalID);
      }
    }, 1000);
  }

  // Add eventlistner for keypresses. When a key is pressed, handleKeyPress is called.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  },[])


  // change open state and player coordinates every 200 ms.
  useEffect(() => {
    setTimeout(() => { 
      setOpen(!open)
      move()
    }, 200)
  }, [open])
  //setTimeout(() => setOpen(!open), 500)
  

// Creates a game board with empty cells as a matrice
useEffect(() => {
    // cellValue indicates type of cell 
    let cellValue = ''
    let blankRows = [];
    for (let y = 0; y < height; y++) {
      const cells = [];
      for (let x = 0; x < width; x++) {
        // x and y are coordinates for the cell 
        cells.push({ x, y, cellValue });
      }
      blankRows.push(cells);
    }
    setGameboard(blankRows);
  },[]);

  // Sets the Direction state according to keyboard input
  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        setDirection('u')
        break
      case 'a':
      case 'ArrowLeft':
        setDirection('l')
        break
      case 's':
      case 'ArrowDown':
        setDirection('d')
        break
      case 'd':
      case 'ArrowRight':
        setDirection('r')
        break
    }
  }

  // moves player according to the Direction state
  const move = () => {
    let newCoords = {}

    moveCat(catPosition)
  
    // determine new coordinates
    switch (direction) {
      // Right 
      case 'r':
        newCoords = { x: (playerCoords.x + 1) % width, y: playerCoords.y}
        break
      // Left 
      case 'l':
        newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
        break
      // Up 
      case 'u':
        newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}  
        break
      // Down 
      case 'd':
        newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
        break
    }

    // if next position is not a brick, update position with setPlayerCoords.
    if (!isBrick(newCoords.x, newCoords.y)) {
      setPlayerCoords(newCoords)
      eatCheese(gameboard,newCoords.x,newCoords.y)
    }
  }

 
  // Function that updates the cell value of a cell, 
  // returns the updated gameboard.
  // 
 function updateCellValue(gameboard, x, y, newValue){
  if(gameboard[y]){
    let cell = gameboard[y][x];
    if(cell){
      if(cell.cellValue === 'empty' || cell.cellValue === 'rat'){
        return gameboard;
      } else {
        cell.cellValue = newValue;
      }
      }
    return gameboard;
 }
}

// Function that checks the gameboard for cheese that has not yet been eaten
// 
function countCheese(gameboard){
  let count = cheeseCount(gameboard);
  return count;
}

// Calculates the adjacent cells, from the position of the Cat 
// The adjacent cells are either to the left, right, up or down. 
// 
function adjacentCells(catPosition){
  let adjCells = {}    
    adjCells = [
      // Cell to the right 
      { x: (catPosition.x + 1), y: catPosition.y },
      // Cell to the left  
      { x: (catPosition.x - 1), y: catPosition.y },
      // Cell above 
      { x: catPosition.x, y: (catPosition.y + 1) },
      // Cell under 
      { x: catPosition.x, y: (catPosition.y - 1) }
    ]
  
  return adjCells;
}

// Calculates possible moves for the Cat  
// 
function possibleMoves(catPosition){
  // Calculate adjacent cells first 
  let adjCells = adjacentCells(catPosition);
  let newMoves = []
  for(let i = 0; i < adjCells.length; i ++){
    // Check if the cell is a brick 
    if(!isBrick(adjCells[i].x, adjCells[i].y)){
      // If not, we add the possible move to the array newMoves 
      let cell = ({ x: adjCells[i].x, y: adjCells[i].y });
      newMoves.push(cell);
    }
  }
  return newMoves;
}

// Function that generates a random int based on the length of an array 
// 
function getRandomInt(arrayLength) {
  return Math.floor(Math.random() * (arrayLength)); 
}

// Function that moves the cat to a new adjacent cell, 
// which is chosen randomly 
// 
function moveCat(catPosition){
  // First calculate pssible moves 
  let moves = possibleMoves(catPosition);
  // Randomize choice of next move, based on length of moves 
  let randNum = getRandomInt(moves.length);
  // Next move is then calculated 
  let nextMove = moves[randNum];
  // And the cat is moved to this randomly chosen cell 
  setCatPosition(nextMove);
}


// Function that checks if the cheese of a cell is eaten
//



// Function that handles eating cheese from the board 
// 
function eatCheese(gameboard, x, y){
  // The actual cell 
  let cell = gameboard[y][x]
  
  // Check if cell exists and if the cheese has been eaten 
  if(cell && !isCheeseEaten(gameboard,x,y)){
    // If cheese not eaten, increment score by one
    incrementPoints()
    console.log(cell.cellValue)
    if (cell.cellValue==='supercheese'){
      setPowerUpActive(true);
      startTimer();
      console.log("PowerUp active" ,powerUpActive, timer)
      updateCellValue(gameboard,x,y,'empty')
    }
    // Update cell value to empty 
      updateCellValue(gameboard,x,y,'empty')
    // Plays sound effect when eating
    playChew();
    // Return the updated game board 
    return gameboard;
  } else if (points != 0 && numCheese === 0){
    endGame();
  } else{ 
    // Return game board as is
    return gameboard;
  }
}
  
  // Function that handles collision between the rat and the cat 
  // 
  function endGame(){
    // Sets final score to the curren point count, TODO: not in use?
    setFinalScore(points);
    // Enables Game Over-Screen
    setGameover(true);
    // Disables display of gameboard 
    setGamePlay(false);
  }

  // Function that increments point counter by one 
  // 
  function incrementPoints(){
    if(numCheese === 0){
      return points;
    } else {
      let p = 0;
      // Calculate previous value of point and put it into the new variable p
      // Set point score to the new value of p
      p = points + 1;
      return(setPoints(p));
    }
  }
  
  // Function that decrements point counter by one 
  // 
  // TODO: Not in use. Maybe use this to implement multiple lives? 
  function decrementPoints(){
    let p = 0;
    p = points - 1;
    console.log('Decrements score')
    return(setPoints(p));
  }
  
  // Checks if a cell is a brick 
  const isBrick = (x, y) => {
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      return true
    }
    if (y === 2 && x < width - 5 && x > 1) {
      return true
    }
    if (y > 2 && y < height - 2 && x === 2){
      return true
    }
    if (x === 4 && y < height - 2 && y > height - 8){
      return true
    }
    if (x === 5 && y < height - 5 && y > height - 8){
      return true
    }
    if (x === 6 && ((y < height - 5 && y > height - 8) || (y < height - 2 && y > height - 5))){
      return true
    }
    if (x === 7 && y < height - 2 && y > height - 5){
      return true
    }
    if (x === 8 && ((y < height - 2 && y > height - 6) || (y === height - 7))){
      return true
    }
    if (x === 10 && y < height - 2 && y > height - 9){ 
      return true
    }
    return false

  }

  // Determines what type of elements are in each cell
  //  
  const determineElements = (gameboard, x, y) => {
    // If cell is equal to the value of cat position the cat is placed there
    // If cat position is equal to the player position

    if(!gameover && catPosition.x === playerCoords.x && catPosition.y === playerCoords.y && !powerUpActive){
      // The game is over 
      // TODO: Implement collision handling 
      endGame();
    }
    if(x === catPosition.x && y === catPosition.y){
      // Update cell value to cat 
      updateCellValue(gameboard,x,y,'cat')
      // Return the cat 
      return <Cat open={open}/>
    }
    
    // If the cell is equal to the player coordinates, the rat is placed there
    if (x === playerCoords.x && y === playerCoords.y) {
      // Update cell value to rat
      updateCellValue(gameboard,x,y,'rat')
      // Return the rat with state for open mouth and direction to enable animation
      return <Rat open={open} direction={direction} powerupActive={powerUpActive}/>
    }
    // If the cell is a brick 
    if (isBrick(x, y)) {
      // Update cell value to brick 
      updateCellValue(gameboard,x,y,'brick')
      // Return brick 
      return <Brick/>
    }
    // If the cell is not a brick 
    if(!isBrick(x,y)){
      // If cheese is eaten, return an empty cell 
      if(isCheeseEaten(gameboard,x,y)) return;
    }

    if(x==1 && y==4){
      updateCellValue(gameboard,x,y,'supercheese')
      return <SuperCheese/>
    }
    // Otherwise it is a cheese
    // Update cell value to cheese 
    updateCellValue(gameboard,x,y,'cheese')
    // Return the cheese 
    return <Cheese/>
  }

  // Then we return the html code for the game  
    return (
      <>
      { gameover ? 
        navigation('/GameOver', { state: {finalScore: points }}) : null }
       {/* HTML code for the game logic  */}
       {gameplay ? 
        <div className='body' 
          style={{
            flexDirection:'row', 
            justifyContent:'space-evenly',
            fontSize:30, 
            fontWeight:'bold'}}>
             {language.score.titleText}{points}
        {/* The game board  */}
          <div  
            className="game-board" 
            style={{
              backgroundColor: 'gray',
              display: 'grid',
              gridTemplateColumns: `repeat(${width}, 1fr)`,
              gridTemplateRows: `repeat(${height}, 1fr)`,
              maxHeight: '60vh',
              maxWidth: '100vw',
              aspectRatio: '4 / 3' 
            }}>
            {gameboard.map((cells) => {
              return cells.map(({ x, y }) => (
                  <div key={`${x}-${y}`} className="cell" style={{ color: 'gray', gridArea: `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`}}>
                    {determineElements(gameboard, x, y)}
                  </div>
                ))
            })}
          </div> </div> : null }
          </>
  );
}


export default GameBoard;

//************
// END of file GameBoard.jsx 
//************
