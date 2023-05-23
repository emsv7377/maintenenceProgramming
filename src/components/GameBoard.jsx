import React, { useState, useEffect, useContext } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';
import Cat from './Cat';
import LanguageContext from './LanguageContext';
import useSound from 'use-sound';
import chew from './audio/chew.mp3'
import GameOver from '../screens/GameOver';
import { useNavigate } from 'react-router-dom';

function GameBoard(props) {
  const [rows,setRows] = useState([]); // state for gameboard 
  const { width, height } = props;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // state for the player's position
  const [open, setOpen] = useState(false) // state for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.
  const [points, setPoints] = useState(0);  // state for player's score 
  const language = useContext(LanguageContext); // state for current language 

  // TODO: change to volume: 0.1 or 0.2 debugging done
  const [playChew] = useSound(chew, {volume:0}); // state for sound effect: eatCheese

  const [isPlaying, setIsPlaying] = useState(true);  // state for game over
  const [catPosition, setCatPosition] = useState({x:1, y:8})

  // sets direction state according to keyboard input
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

  // moves player according to direction state
  const move = () => {
    let newCoords = {}
  
    switch (direction) {
      case 'r':
        newCoords = { x: (playerCoords.x + 1) % width, y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }
        break
      case 'l':
        newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)){
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }
        break
      case 'u':
        newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }       
        break
      case 'd':
        newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }

        break
    }
  }
  // add eventlistner for keypresses. When a key is pressed, handleKeyPress is called.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  },[rows, playerCoords.x, playerCoords.y])

  // change open state and player coordinates every 200 ms.
  useEffect(() => {
    setTimeout(() => { 
      setOpen(!open)
      move()
    }, 200)
  }, [open])
  //setTimeout(() => setOpen(!open), 500)
  

// Creates a game board with cells as a matrice
  // Cell value indicates type of cell 
  useEffect(() => {
    let cellValue = ''
    let blankRows = [];
    for (let y = 0; y < height; y++) {
      const cells = [];
      for (let x = 0; x < width; x++) {
        cells.push({ x, y, cellValue });
      }
      blankRows.push(cells);
    }
    setRows(blankRows);
  },[]);
 
   
/**
 * Updates the cellValue parameter of a chosen cell in the array rows 
 * @param {*} rows The array of cells 
 * @param {*} x The x coordinate of the chosen cell
 * @param {*} y The y coordinate of the chosen cell 
 * @param {String} newValue  the new cellValue value for x and y
 * @returns The updated rows array  
 */
 function updateCellValue(rows, x, y, newValue){
  if(rows[y]){
    let cell = rows[y][x];
    if(cell){
      if(cell.cellValue === 'empty' || cell.cellValue === 'rat'){
        return rows;
      } else {
        cell.cellValue = newValue;
      }
      }
    return rows;
 }
}

/**
 * Checks adjacent cells from cat's current position 
 * @param {*} catPosition Position of cat 
 * @returns All adjacent cells 
 */
function adjacentCells(catPosition){
  let adjCells = {}

  if(catPosition.x === 0 && catPosition.y !== 0){
    adjCells = [
      { x: (catPosition.x + 1), y: catPosition.y },
      { x: catPosition.x, y: (catPosition.y + 1) }, 
      { x: catPosition.x, y: (catPosition.y - 1) }
    ]
  }
  else if (catPosition.y === 0 && catPosition.x !== 0){
    adjCells = [
      { x: catPosition.x, y: (catPosition.y + 1) }, 
      { x: (catPosition.x + 1), y: catPosition.y }, 
      { x: (catPosition.x - 1), y: catPosition.y }
    ]
  } else if (catPosition.x === 0 && catPosition.y === 0){
    adjCells = [
      { x: (catPosition.x + 1), y: catPosition.y }, 
      { x: catPosition.x, y: (catPosition.y + 1) }
    ]
  } else {
    adjCells = [
      { x: (catPosition.x + 1), y: catPosition.y },
      { x: (catPosition.x - 1), y: catPosition.y },
      { x: catPosition.x, y: (catPosition.y + 1) },
      { x: catPosition.x, y: (catPosition.y - 1) }
    ]
  }
  return adjCells;
}

/**
 * Checks adjacent cells to cat position 
 * @param {*} adjCells Adjacent cells on the current position 
 * @returns Possible moves for cat 
 */
function possibleMoves(catPosition){
  let adjCells = adjacentCells(catPosition);
  let newMoves = []
  for(let i = 0; i < adjCells.length; i ++){
    if(!isBrick(adjCells[i].x, adjCells[i].y)){
      let cell = ({ x: adjCells[i].x, y: adjCells[i].y });
      newMoves.push(cell);
    }
  }
  return newMoves;
}


/**
 * 
 * @param {*} min Minimum value 
 * @param {*} max Maximum value 
 * @returns Random integer between min and max 
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

/**
 * Moves the cat to a new adjacent cell, choice done randomly  
 * @param {*} catPosition 
 */
function moveCat(catPosition){
  let moves = possibleMoves(catPosition);
  let min = 0; 
  let max = (moves.length);
  // Randomize choice of next move
  let randNum = getRandomInt(min,max)

  let nextMove = moves[randNum];
  setCatPosition(nextMove);

}

/**
 * Checks if the cheese of a cell is eaten 
 * @param {*} rows The game board
 * @param {*} x X coordinate of the cell
 * @param {*} y Y coordinate of the cell 
 * @returns true if cell is empty, false otherwise 
 */
function isCheeseEaten(rows,x,y){
  let cell = rows[y][x]
  if (cell && cell.cellValue === 'empty' || cell && cell.cellValue === 'rat'){
    return true;
  }
  return false;
}

/**
 * Eats a cheese and increment score by one 
 * @param {*} rows The game board  
 * @param {*} x The x coordinate of the cell
 * @param {*} y The y coordinate of the cell 
 * @returns the updated game board 
 */
  function eatCheese(rows, x,y){
    let cell = rows[y][x]
    console.log('cell.cellvalue', cell.cellValue)
    if(cell && !isCheeseEaten(rows,x,y)){
      // Increment score by one
      incrementPoints()
      // Update cell value that it is empty 
      updateCellValue(rows,x,y,'empty')
      // Plays sound effect 
      playChew();
      // Return the updated game board 
      return rows;
    } else {
      console.log('already eaten')
    // Return updated game board
      return rows;
  }
}
  /**
   * Decrement lives of player or points? 
   */
  function collision(){
    // TODO: collision, decrement lives? 
    setIsPlaying(false);
  }

  /**
   * Increments point counter by one 
   * @returns the incremented point counter
   */
  function incrementPoints(){
    let p = 0;
    p = points + 1;
    return(setPoints(p));
  }
  
  /**
   * Decrements point counter by one
   * @returns The decremented point counter
   */
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
  const determineElements = (rows, x, y) => {
    if(x === catPosition.x && y === catPosition.y){
      //console.log('Cat pos: ', catPosition.x, catPosition.y)
      updateCellValue(rows,x,y,'cat')
      return <Cat open={open}/>
    }
    if(catPosition.x === playerCoords.x && catPosition.y === playerCoords.y){
      console.log('collision - game over');
    }
    if (x === playerCoords.x && y === playerCoords.y) {
      updateCellValue(rows,x,y,'rat')
      return <Rat open={open} direction={direction}/>
    }
    if (isBrick(x, y)) {
      updateCellValue(rows,x,y,'brick')
      return <Brick/>
    }
    if(isCheeseEaten(rows,x,y)){
      return;
    }
    updateCellValue(rows,x,y,'cheese')
    return <Cheese/>
  }

    return (
      
      <> 
      { isPlaying ?  
        null
       : <GameOver></GameOver>};
        <div className='body' 
          style={{
            flexDirection:'row', 
            justifyContent:'space-evenly',
            fontSize:30, 
            fontWeight:'bold'}}>
            {language.score.titleText}{points}
        </div>
        <div className="game-board" style={{backgroundColor: 'gray' }}>
          {rows.map((cells, y) => (
            <div key={y} className="row" style={{ }}>
              {cells.map(({ x, y }) => (
                <div key={`${x}-${y}`} className="cell" style={{ color: 'gray'}}>
                  {determineElements(rows, x,y)}
                </div>
              ))}
            </div>
          ))}
        </div> 
    </>
  );
}

export default GameBoard;
