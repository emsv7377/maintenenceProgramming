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
import Rat from './Rat';
import Cat from './Cat';
import LanguageContext from './LanguageContext';
import useSound from 'use-sound';
import chew from './audio/chew.mp3'
import GameOver from '../screens/GameOver';


function GameBoard({ width, height }) {
  const [gameboard,setGameboard] = useState([]); // State for gameboard 
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // State for the player's position
  const [open, setOpen] = useState(false) // State for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.
  const [points, setPoints] = useState(0);  // State for player's score 
  const language = useContext(LanguageContext); // State for current language 
  
  // TODO: change to volume: 0.1 or 0.2 debugging done
  const [playChew] = useSound(chew, {volume:0}); // State for sound effect: eatCheese

  const [isPlaying, setIsPlaying] = useState(true);  // State for status of game 
  const [catPosition, setCatPosition] = useState({x:1, y:8}) // State for cat 

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
  
    switch (direction) {
      // Right 
      case 'r':
        newCoords = { x: (playerCoords.x + 1) % width, y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }
        break
      // Left 
      case 'l':
        newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)){
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }
        break
      // Up 
      case 'u':
        newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }       
        break
      // Down 
      case 'd':
        newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }

        break
    }
  }
  // Add eventlistner for keypresses. When a key is pressed, handleKeyPress is called.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  },[gameboard, playerCoords.x, playerCoords.y])

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
function isCheeseEaten(gameboard,x,y){
  let cell = gameboard[y][x]
  // If cell value is empty or rat, then the cheese is eaten 
  if (cell && cell.cellValue === 'empty' || cell && cell.cellValue === 'rat'){
    return true;
  }
  return false;
}

// Function that handles eating cheese from the board 
// 
function eatCheese(gameboard, x, y){
  // The actual cell 
  let cell = gameboard[y][x]
  // Check if cell exists and if the cheese has been eaten 
  if(cell && !isCheeseEaten(gameboard,x,y)){
    // If cheese not eaten, increment score by one
    incrementPoints()
    // Update cell value to empty 
    updateCellValue(gameboard,x,y,'empty')
    // Plays sound effect when eating
    playChew();
    // Return the updated game board 
    return gameboard;
  } else {
    // Return game board as is
    return gameboard;
  }
}
  
  // Function that handles collision between the rat and the cat 
  // 
  // TODO: Implement game over-screen, handle collision 
  function collision(){
    // TODO: collision, decrement lives? 
    //setIsPlaying(false);
  }

  // Function that increments point counter by one 
  // 
  function incrementPoints(){
    let p = 0;
    // Calculate previous value of point and put it into the new variable p
    p = points + 1;
    // Set point score to the new value of p 
    return(setPoints(p));
  }
  
  // Function that decrements point counter by one 
  // 
  // TODO: Implement this when colliding with a Cat / Wall 
  // to give player more chances than one? 
  function decrementPoints(){
    let p = 0;
    p = points - 1;
    console.log('Decrements score')
    return(setPoints(p));
  }

  function incrementCheeseCounter(){
    let c = 0; 
    c = numberOfCheese + 1;
    return(setNumberOfCheese(c));

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
    if(x === catPosition.x && y === catPosition.y){
      // Update cell value to cat 
      updateCellValue(gameboard,x,y,'cat')
      // Return the cat 
      return <Cat open={open}/>
    }
    // If cat position is equal to the player position
    if(catPosition.x === playerCoords.x && catPosition.y === playerCoords.y){
      // The game is over 
      // TODO: Implement collision handling 
      collision();
      console.log('collision - game over');
    }
    // If the cell is equal to the player coordinates, we place the rat there
    if (x === playerCoords.x && y === playerCoords.y) {
      // Update cell value to rat
      updateCellValue(gameboard,x,y,'rat')
      // Return the rat with state for open mouth and direction to enable animation
      return <Rat open={open} direction={direction}/>
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
    // Otherwise it is a cheese
    // Update cell value to cheese 
    updateCellValue(gameboard,x,y,'cheese')
    // Return the cheese 
    return <Cheese/>
  }

  function startGame(){
    
  }

  function endGame(){

  }
  

  // Then we return the html code for the game  
    return (
      <> 
      <div id='gameOver'> 
        <GameOver score={points}/>
      </div>
       {/* HTML code for the game logic  */}
        <div className='body' 
          style={{
            flexDirection:'row', 
            justifyContent:'space-evenly',
            fontSize:30, 
            fontWeight:'bold'}}>
            {language.score.titleText}{points}
        </div>
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
              aspectRatio: '1 / 1' 
            }}>
            {gameboard.map((cells) => {
              return cells.map(({ x, y }) => (
                  <div key={`${x}-${y}`} className="cell" style={{ color: 'gray', gridArea: `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`}}>
                    {determineElements(gameboard, x, y)}
                  </div>
                ))
            })}
          </div> 
        
    </>
  );
}

export default GameBoard;

//************
// END of file GameBoard.jsx 
//************