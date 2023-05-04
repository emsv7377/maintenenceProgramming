import React, { useState, useEffect } from 'react';
//import { useNavigation } from 'react-router-dom';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';

import BackgroundMusic from './BackgroundMusic'

function GameBoard(props) {
  const rows = [];
  const { width, height } = props;
  //console.log(props)
  const [position, setPosition] = useState({ x: 1, y: 1 });
  // Ratmans position
  Rat.position = position;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // state for the player's position
  const [open, setOpen] = useState(false) // state for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.

  const [hiddenCheese, setHiddenCheese] = useState({ x:1, y:1, hidden: true})  
  const [points, setPoints] = useState(0); 
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
        if (!isBrick(newCoords.x, newCoords.y)) setPlayerCoords(newCoords)
        break
      case 'l':
        newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)) setPlayerCoords(newCoords)
        break
      case 'u':
        newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}
        if (!isBrick(newCoords.x, newCoords.y)) setPlayerCoords(newCoords)       
        break
      case 'd':
        newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
        if (!isBrick(newCoords.x, newCoords.y)) setPlayerCoords(newCoords)
        break
    }
    // Checks what type of cell Ratman is standing on
    checkRatManPosition(rows, playerCoords.x, playerCoords.y);
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
  // cellValue shows type of cell 
 const cellValue = ''; 
  for (let y = 0; y < height; y++) {
    const cells = [];

    for (let x = 0; x < width; x++) {
      cells.push({ x, y, cellValue });
    }
    rows.push(cells);
  }
 
  // Navigates to up the tutorial
  // TODO: Implement tutorial opening
  function navTutorial(){
    console.log('Tutorial not implemented')
  }
   
/**
 * Updates the cellValue parameter of a chosen cell in the array rows 
 * @param {*} rows The array of cells 
 * @param {String} x The x coordinate of the chosen cell
 * @param {String} y The y coordinate of the chosen cell 
 * @param {String} value  the new cellValue value for x and y
 * @returns The updated rows array  
 */
 function updateCellValue(rows, x, y, newValue){
  // Find index of the current coordinates in the array rows 
  if(rows[y]){
    let cell = rows[y][x];
    if(cell){
      cell.cellValue = newValue;
      }
    return rows;
 }
}

 /**
  * Checks what type of cell RatMan stands on 
  * @param {*} rows The game board
  * @param {String} x The x coordinate for Ratmans position
  * @param {String} y The y coordinate for Ratmans position
  * @returns the cell value 
  */
 function checkRatManPosition(rows, x, y){
  let value = ''
  
  // Known positions of bricks
  if (x === 0 || y === 0) {
    value = 'brick'
  } else {
    const cell = rows[y][x]
    value = cell.cellValue;
  } 
  // Checks if Ratman steps on a cell with cheese, or if an empty cell 
  // Empty cell indicates that Ratman is standing on it
  if(value === 'cheese' || value === ''){
    value = 'cheese'
    eatCheese(x,y)
  }
  else if(value === 'brick'){
    collision()
  } else {
    value = 'error';
    console.log('error')
  }
  return value;
 }

 /**
  * Increments point counter and removes cheese from board  
  */
  function eatCheese(x,y){
    // TODO: increment points and remove cheese from cell
    incrementPoints()
    setHiddenCheese({x:x, y:y, hidden:true});
  }
  /**
   * Decrement lives of player and animation?
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
    console.log('Increments score')
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

  const determineElements = (x, y) => {
    if (x === playerCoords.x && y === playerCoords.y) {
      return <Rat open={open}/>
    }
    if (isBrick(x, y)) {
      return <Brick/>
    }
    /*if(hiddenCheese.hidden === true && x === hiddenCheese.x && y === hiddenCheese.y){
      return;
    }*/
    return <Cheese/>
  }

    
    return (
      <>
      <BackgroundMusic/>
    <div className='body' style={{flexDirection:'row', fontSize:30}}>
      <form onSubmit={navTutorial}>
        {'Score: '}{points}
        <button
          style={{
            backgroundColor:'black',
            color:'white',
            fontSize:20,
            width:200,
            height:50, 
            borderRadius:15, 
            margin:10,
            marginLeft:400,
            fontWeight:'bold'
          }}
          type='submit'>
            Tutorial
          </button>
        </form>
        </div>
        <div>
      
    </div>
    <div className="game-board" style={{backgroundColor: 'gray' }}>
      {rows.map((cells, y) => (
        <div key={y} className="row" style={{ }}>
          {cells.map(({ x, y }) => (
            <div key={`${x}-${y}`} className="cell" style={{ color: 'gray'}}>
              {determineElements(x,y)}
              
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}

export default GameBoard;
