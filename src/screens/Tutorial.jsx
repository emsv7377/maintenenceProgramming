import React, { useState, useEffect, useContext, ToutchableOpacity } from 'react';
import { useNavigate } from 'react-router-dom'
import Rat from '../components/Rat';
import keyboard from '../assets/keyboard.png';
import check from '../assets/check.png';
import Brick from '../components/Brick';
import Cheese from '../components/Cheese';
import LanguageContext from '../components/LanguageContext';
import useSound from 'use-sound';
import chew from '../components/audio/chew.mp3'


function Tutorial(props) {
    const [gameboard,setGameboard] = useState([]); // State for gameboard 
   const { width, height } = props;
    const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // state for the player's position
    const [open, setOpen] = useState(false) // state for Rat open or closed
    const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.
    const [points, setPoints] = useState(0);  // state for player's score 
    const language = useContext(LanguageContext); // state for current language 
    const [playChew] = useSound(chew, {volume:0.2}); // state for sound effect: eatCheese
    const navigate = useNavigate();
    const [alreadyShown, setAlreadyShown] = useState(false);
    const [showing1, setShowing1] = useState(true);
    const [showing2, setShowing2] = useState(false);
    const [showing3, setShowing3] = useState(false);
    const [eaten, setEaten] = useState(false);


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
          setShowing1(false)
          if (!alreadyShown) {
            setShowing2(true)
            setAlreadyShown(true)
          }
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
            eatCheese(gameboard,newCoords.x,newCoords.y)
          }
          break
        case 'l':
          newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
          if (!isBrick(newCoords.x, newCoords.y)){
            setPlayerCoords(newCoords)
            eatCheese(gameboard,newCoords.x,newCoords.y)
          }
          break
        case 'u':
          newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}
          if (!isBrick(newCoords.x, newCoords.y)) {
            setPlayerCoords(newCoords)
            eatCheese(gameboard,newCoords.x,newCoords.y)
          }       
          break
        case 'd':
          newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
          if (!isBrick(newCoords.x, newCoords.y)) {
            setPlayerCoords(newCoords)
            eatCheese(gameboard,newCoords.x,newCoords.y)
          }
          break
      }
    // if next position is not a brick, update position with setPlayerCoords.
    if (!isBrick(newCoords.x, newCoords.y)) {
      setPlayerCoords(newCoords)
      eatCheese(gameboard,newCoords.x,newCoords.y)
    }
    }
    // add eventlistner for keypresses. When a key is pressed, handleKeyPress is called.
    useEffect(() => {
      document.addEventListener('keydown', handleKeyPress)
      return () => {
        document.removeEventListener('keydown', handleKeyPress)
      }
    },[])
  
    // change open state and player coordinates every 300 ms.
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
   
     
  /**
   * Updates the cellValue parameter of a chosen cell in the array rows 
   * @param {*} rows The array of cells 
   * @param {*} x The x coordinate of the chosen cell
   * @param {*} y The y coordinate of the chosen cell 
   * @param {String} newValue  the new cellValue value for x and y
   * @returns The updated rows array  
   */
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
  
  /**
   * Checks if the cheese of a cell is eaten 
   * @param {*} rows The game board
   * @param {*} x X coordinate of the cell
   * @param {*} y Y coordinate of the cell 
   * @returns true if cell is empty, false otherwise 
   */
  function isCheeseEaten(gameboard,x,y){
    let cell = gameboard[y][x]
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
    function eatCheese(gameboard, x,y){
      let cell = gameboard[y][x]
      console.log(cell)
      if(cell && isCheese(cell.x, cell.y) && eaten === false){
        console.log('är vi här???')
        // Increment score by one
        incrementPoints()
        // Update cell value that it is empty 
        updateCellValue(gameboard,x,y,'empty')
        // Plays sound effect 
        setShowing2(false)
        setShowing3(true)
        playChew();
        setEaten(true)
        console.log(showing);
        // Return the updated game board 
        return gameboard;
      } else {
        console.log('already eaten')
      // Return updated game board
        return gameboard;
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
      if (y === 2 && x >= 1 && x < 6) {
        return true
      }
      if (y === 4 && x > 1) {
        return true
      }
      return false
  
    }

    const isCheese = (x, y) => {
      if (y === 3 && x === 4) {
        return true
      }
      return false
    }

     // Determines what type of elements are in each cell 
     const determineElements = (gameboard, x, y) => {
        if (x === playerCoords.x && y === playerCoords.y) {
          updateCellValue(gameboard,x,y,'rat')
          return <Rat open={open} direction={direction}/>
        }
        if (isBrick(x, y)) {
          updateCellValue(gameboard,x,y,'brick')
          return <Brick/>
        }
        if(isCheeseEaten(gameboard,x,y)){
          return;
        }
        if (isCheese(x, y)){
        updateCellValue(gameboard,x,y,'cheese')
        return <Cheese></Cheese>
      }
      }

   return(
    <><div style={{
      flexDirection: 'row',
      fontSize: 30,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'flex-start', // Align items to the top of the flex container
      marginLeft: 20, // Add left margin for spacing
    }}>
      <div style={{
      flexDirection: 'column',
      fontSize: 30,
      justifyContent: 'space-evenly',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'flex-start', // Align items to the top of the flex container
      marginLeft: 20, // Add left margin for spacing
      marginRight: 60, // Add left margin for spacing
    }}>
      <div>Move with arrows</div>
      <div><img src={keyboard} width={100} height={70}></img> </div>
      <div style={{ opacity: showing1 ? 0 : 1 }}>
      <img src={check} width={100} height={70}></img> 
      </div>
      <div>
      <div>Eat cheese to earn points!</div>
      {language.score.titleText}{points}
      <div style={{ opacity: showing2 ? 0 : 1 }}>
      <img src={check} width={100} height={70}></img> 
      </div>
      </div>
      <div>
      Avoid cats
      <div style={{ opacity: showing3 ? 0 : 1 }}>
      <img src={check} width={100} height={70}></img> 
      </div>

      </div>
      </div>
  <div className="game-board" style={{backgroundColor: 'gray',
              display: 'grid',
              gridTemplateColumns: `repeat(${width}, 1fr)`,
              gridTemplateRows: `repeat(${height}, 1fr)`,
              maxHeight: '60vh',
              maxWidth: '100vw',
              aspectRatio: '1 / 1' }}>
              {gameboard.map((cells) => {
              return cells.map(({ x, y }) => (
                  <div key={`${x}-${y}`} className="cell" style={{ color: 'gray', gridArea: `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`}}>
                    {determineElements(gameboard, x, y)}
                  </div>
                ))
            })}
  </div>
  </div>
  </>
);
   }

   const styles = {
    backgroundColor:'black', 
    color:'white', 
    fontSize:22, 
    width: 280, 
    height:60, 
    margin:10,
    borderRadius:15, 
    alignSelf:'center',
    fontWeight:'bold'
}
//  
export default Tutorial;
