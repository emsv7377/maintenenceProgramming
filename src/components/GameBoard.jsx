import React, { useState, useEffect } from 'react';
//import { useNavigation } from 'react-router-dom';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';

function GameBoard(props) {
  const rows = [];
  const { width, height } = props;
  console.log(props)
  const [position, setPosition] = useState({ x: 1, y: 1 });
  
  Rat.position = position;
  
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
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
},);

// Creates a game board with cells as a matrice 
 const occupiedCell = ''; 
 // const occupiedCell = 'cheese';
  for (let y = 0; y < height; y++) {
    const cells = [];

    for (let x = 0; x < width; x++) {
      cells.push({ x, y, occupiedCell });
    }
    rows.push(cells);
  }
 
  // Opens up the tutorial 
  function navTutorial(){
    console.log('Tutorial not implemented')
  }

  /**
   * Searches through each element in an array and nested arrays to compare x and y values
   * @param {*} rows Array consisting of arrays with cells 
   * @param {*} x The coordinate x to search for 
   * @param {*} y 
   * @returns An array with the indices of the match, if no match [-1,-1] is returned 
   */
function findIndex(rows, x, y){
  let index = [-1,-1]
  // Since the array rows is a matrix we need to search th
    for (let i = 0; i < rows.length; i++){
      for(let j = 0; j < rows[i].length; j++){
        if(rows[i][j].x === x && rows[i][j].y === y){
          index = [i,j];
          return index;
        } 
      }
    }
    return index;
   }

/**
 * Updates the occupiedCell parameter of a chosen cell in the array rows 
 * @param {*} rows The array of cells 
 * @param {*} x The x coordinate of the chosen cell
 * @param {*} y The y coordinate of the chosen cell 
 * @param {*} value The new occupiedCell value for x and y
 * @returns The updated rows array  
 */
 function updateOccupiedCell(rows, x, y, value){

  // Find index of the current coordinates in the array rows 
  let index = findIndex(rows, x, y);
  // Catch error if invalid index 
  if(index === [-1,-1]){
    // TODO: catch error somehow  
    console.log('Error, did not find element')
    return;
  } 
    // Update the occupiedCell value to indicate type of cell
    const row = rows[index[0]][index[1]];
    row.occupiedCell = value;
    return rows;
 }

 /**
  * Checks what type of cell RatMan stands on 
  * @param {*} rows The game board
  * @param {*} x The x coordinate for Ratmans position
  * @param {*} y The y coordinate for Ratmans position
  */
 function checkRatManPosition(rows, x, y){
  // Finds index in the game board for the position 
  let index = findIndex(rows, x, y)
  const row = rows[index[0]][index[1]]; 
  // Value of the current cell
  const value = row.occupiedCell;
  console.log('row', row)
  console.log('value: ', value)
  if(value.toString() === ''){
    console.log('error, empty cell')
    // TODO: catch error
  }
  if(value.toString() === 'cheese'){
    eatCheese()
  } else if(value.toString() === 'brick'){
    collision()
  }
  return value;
 }

 /**
  * Increments point counter and removes cheese from board  
  */
  function eatCheese(){
    // TODO: increment points and remove cheese from cell
    console.log('eatCheese()')
  }

  /**
   * Decrement lives of player and animation?
   */
  function collision(){
    // TODO: collision, decrement lives? 
    console.log('collision()')
  }

  // Determines element of each tile 
  const determineElements = (x, y) => {
    let val = 'brick';
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (y === 2 && x < width - 5 && x > 1) {
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (y > 2 && y < height - 2 && x === 2){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === 4 && y < height - 2 && y > height - 8){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === 5 && y < height - 5 && y > height - 8){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === 6 && ((y < height - 5 && y > height - 8) || (y < height - 2 && y > height - 5))){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === 7 && y < height - 2 && y > height - 5){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === 8 && ((y < height - 2 && y > height - 6) || (y === height - 7))){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === 10 && y < height - 2 && y > height - 9){
      updateOccupiedCell(rows, x, y, val)
      return <Brick/>
    }
    if (x === position.x && y === position.y) {
      console.log('RAT position', position)
      return <Rat position={position} />;
    }
    val = 'cheese'
    updateOccupiedCell(rows, x, y, val)
    console.log('rows',rows)
    checkRatManPosition(rows, x, y)
    return <Cheese/>
  }

  return (
    <>
    <div className='body'>
      <form onSubmit={navTutorial}>
        <button
          style={{
            backgroundColor:'black',
            color:'white',
            fontSize:22,
            width:40,
            height:60, 
            margin:10, 
            borderRadius:15, 
            justifyContent:'flex-end',
            fontWeight:'bold'
          }}
          type='submit'>
            ?
          </button>
        </form>

    </div>
    <div className="game-board" style={{backgroundColor: 'gray',}}>
      {rows.map((cells, y) => (
        <div key={y} className="row">
          {cells.map(({ x, y }) => (
            <div key={`${x}-${y}`} className="cell">
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
