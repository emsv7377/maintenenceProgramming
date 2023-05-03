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

  const [hiddenCheese, setHiddenCheese] = useState({ x:1, y:1, hidden: true})  
  const [points, setPoints] = useState(0); 

  // Handles key presses (arrow keys)
  useEffect(() => {
    const handleKeyDown = (event) => {
    // Update position based on arrow key pressed
    //console.log(event.key);
    switch (event.key) {
      case 'ArrowUp':
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 1 }));
        break;
      case 'ArrowDown':
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 1 }));
        break;
      case 'ArrowLeft':
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 1 }));
        break;
      case 'ArrowRight':
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 1 }));
        break;
      default:
        // Ignore other keys
        break;
    }
    // Checks if Ratman steps on a cell with cheese
    checkRatManPosition(rows, position.x, position.y);
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
},[rows, position.x, position.y]);

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
  

  // Determines element of each tile 
  const determineElements = (hiddenCheese,x, y) => {
    let val = 'brick';
    
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (y === 2 && x < width - 5 && x > 1) {
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (y > 2 && y < height - 2 && x === 2){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (x === 4 && y < height - 2 && y > height - 8){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (x === 5 && y < height - 5 && y > height - 8){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (x === 6 && ((y < height - 5 && y > height - 8) || (y < height - 2 && y > height - 5))){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (x === 7 && y < height - 2 && y > height - 5){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (x === 8 && ((y < height - 2 && y > height - 6) || (y === height - 7))){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    }
    if (x === 10 && y < height - 2 && y > height - 9){
      updateCellValue(rows, x, y, val)
      return <Brick/>
    } 
    if (x === position.x && y === position.y) {
      return <Rat position={position} />;
    }
    // If the cheese has been eaten the cell should be empty 
    // TODO: Currently only hiding the previously eaten cheese
    if(hiddenCheese.hidden === true && x === hiddenCheese.x && y === hiddenCheese.y){
      return;
    }
      val = 'cheese'
      updateCellValue(rows, x, y, val)
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
              {determineElements(hiddenCheese,x,y)}
              
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}

export default GameBoard;
