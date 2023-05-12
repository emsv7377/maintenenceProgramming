import React, { useState, useEffect, useContext } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';
import LanguageContext from './LanguageContext';
import useSound from 'use-sound';
import chew from './audio/chew.mp3'

function GameBoard(props) {
  const [rows,setRows] = useState([]); // state for gameboard 
  const { width, height } = props;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // state for the player's position
  const [open, setOpen] = useState(false) // state for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.
  const [points, setPoints] = useState(0);  // state for player's score 
  const language = useContext(LanguageContext); // state for current language 
  const [playChew] = useSound(chew, {volume:0.2}); // state for sound effect: eatCheese

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
        }
        break
      case 'l':
        newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)){
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
        }
        break
      case 'u':
        newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
        }       
        break
      case 'd':
        newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(rows,newCoords.x,newCoords.y)
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

  // change open state and player coordinates every 300 ms.
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
  // Find index of the current coordinates in the array rows 
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
    decrementPoints();
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
    <div className='body' style={{
      flexDirection:'row', 
      justifyContent:'space-evenly',
      fontSize:30, 
      fontWeight:'bold'}}>
      
      {language.score.titleText}{points}
        </div>
        <div>
      
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
