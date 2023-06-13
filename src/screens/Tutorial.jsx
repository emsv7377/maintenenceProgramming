/**
 * File: Tutorial.jsx 
 * 
 * This file contains the tutorial of RatMan, which includes navigating the rat,
 * collecting cheese and game over. Checkmarks appear after done task. 
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */
import React, { useState, useEffect, useContext, ToutchableOpacity } from 'react';
import { useNavigate } from 'react-router-dom'
import Rat from '../components/Rat';
import keyboard from '../assets/keyboard.png';
import check from '../assets/check.png';
import Brick from '../components/Brick';
import Cheese from '../components/Cheese';
import Cat from '../components/Cat';
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
    const [showing1, setShowing1] = useState(false); // state for first checkmark
    const [showing2, setShowing2] = useState(false); // state for second checkmark
    const [showing3, setShowing3] = useState(false); // state for third checkmark
    const [eaten, setEaten] = useState(false); //state for cheese eaten or not eaten
    const [catPosition, setCatPosition] = useState({x:6, y:5}) // State for cat's position
    const [gameover, setGameover] = useState(false); // State for game over 
    const [gameplay, setGamePlay] = useState(true); // State for when game is playing 
    const [finalScore, setFinalScore] = useState(0); // State for final score of player

    const navigation = useNavigate();


    // sets direction state according to keyboard input
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          setDirection('u')
            setShowing1(true) //show the green checkmark next to "move with arrows"
          
          break
        case 'a':
        case 'ArrowLeft':
          setDirection('l')
            setShowing1(true) //show the green checkmark next to "move with arrows"
          break
        case 's':
        case 'ArrowDown':
          setDirection('d')
            setShowing1(true) //show the green checkmark next to "move with arrows"
          break
        case 'd':
        case 'ArrowRight':
          setDirection('r')
            setShowing1(true) //show the green checkmark next to "move with arrows"
          break
      }
    }
  
    // moves player according to direction state, and eats cheese at the new position
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
  
    // change open state and player coordinates every 200 ms.
    useEffect(() => {
      setTimeout(() => { 
        setOpen(!open)
        move()
      }, 200)
    }, [open])
    
  
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
   * @param {*} gameboard The gameboard (array of cells)
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
   * @param {*} gameboard The game board
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
   * Also when cheese os eaten, two checkmarks appear
   * @param {*} gameboard The game board  
   * @param {*} x The x coordinate of the cell
   * @param {*} y The y coordinate of the cell 
   * @returns the updated game board 
   */
    function eatCheese(gameboard, x,y){
      let cell = gameboard[y][x]
      if(cell && isCheese(cell.x, cell.y) && eaten === false){
        incrementPoints()// Increment score by one
        updateCellValue(gameboard,x,y,'empty')// Update cell value that it is empty 
        setShowing2(true) // show the checkmark for eating cheese
        setShowing3(true) // show the checkmark for avoiding cats 
        playChew();         // Plays sound effect 
        setEaten(true)// Return the updated game board 
        return gameboard;
      } else {
      // Return updated game board
        return gameboard;
    }
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

     /**
     * Returns at which coordinates there are cheese 
     * @returns true or false
     */
    const isCheese = (x, y) => {
      if (y === 3 && x === 4) { // Only one cheese piece on tutorial
        return true
      }
      return false
    }

  // Function that handles collision between the rat and the cat 
  function endGame(){
    // TODO: collision, decrement lives? 
    setGameover(true);
    setFinalScore(points);
    setGamePlay(false);
  }

     // Determines what type of elements are in each cell 
     const determineElements = (gameboard, x, y) => {
          // If cell is equal to the value of cat position the cat is placed there
        // If cat position is equal to the player position
        if(!gameover && catPosition.x === playerCoords.x && catPosition.y === playerCoords.y){
          // The game is over 
          endGame();
        }
        if(x === catPosition.x && y === catPosition.y){
          // Update cell value to cat 
          updateCellValue(gameboard,x,y,'cat')
          // Return the cat 
          return <Cat open={open}/>
        }
        if (x === playerCoords.x && y === playerCoords.y) {
          updateCellValue(gameboard,x,y,'rat')
          return <Rat open={open} direction={direction}/>
        }
        if (isBrick(x, y)) {
          updateCellValue(gameboard,x,y,'brick')
          return <Brick/>
        }
        if(isCheeseEaten(gameboard,x,y)){
          return; //return empty cell if cheese is already eaten
        }
        if (isCheese(x, y)){
        updateCellValue(gameboard,x,y,'cheese')
        return <Cheese></Cheese>
      }
      }

   return(
    <>
    <h1>{language.tutorial.titleText}</h1>
     { gameover ? 
        navigation('/GameOver', { state: {finalScore: points }}) : null }
    {gameplay ?
    <div style={{
      flexDirection: 'row',
      fontSize: 30,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'flex-start', // Align items to the top of the flex container
      marginLeft: 20, 
    }}>
      <div style={{
      flexDirection: 'column',
      fontSize: '3vh',
      justifyContent: 'space-evenly',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'flex-start', // Align items to the top of the flex container
      marginLeft: 20,
      marginRight: 60,
      maxHeight: '60vh',
      maxWidth: '100vw',
      aspectRatio: '4 / 3'
    }}>
 <div style={{ display: 'flex', alignItems: 'center', background: 'lightgrey', padding: 10, marginBottom: 20, borderRadius: 10, width: '100%'}}>
    <div style={{ flex: 1 }}>{language.arrows.titleText}</div>
    <div style={{ marginLeft: 10 }}><img src={keyboard} width={100} height={70} /></div>
    <div style={{ marginLeft: 10, opacity: showing1 ? 1 : 0 }}><img src={check} width={100} height={70} /></div>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', background: 'lightgrey', padding: 10, marginBottom: 20, borderRadius: 10, width: '100%' }}>
    <div style={{ flex: 1 }}>{language.earnPoints.titleText}</div>
    {language.score.titleText}{points}
    <div style={{ marginLeft: 10, opacity: showing2 ? 1 : 0 }}><img src={check} width={100} height={70} /></div>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', background: 'lightgrey', padding: 10, marginBottom: 20, borderRadius: 10, width: '100%' }}>
    <div style={{ flex: 1 }}>{language.avoidCats.titleText}</div>
    <div style={{ marginLeft: 10 }}><img src={'cat-open.svg'} width={100} height={70} /></div>
    <div style={{ marginLeft: 10, opacity: showing3 ? 1 : 0 }}><img src={check} width={100} height={70} /></div>
  </div>
      </div>
  <div className="game-board" style={{backgroundColor: 'gray',
              display: 'grid',
              gridTemplateColumns: `repeat(${width}, 1fr)`,
              gridTemplateRows: `repeat(${height}, 1fr)`,
              maxHeight: '60vh',
              maxWidth: '100vw',
              aspectRatio: '4 / 3' }}>
              {gameboard.map((cells) => {
              return cells.map(({ x, y }) => (
                  <div key={`${x}-${y}`} className="cell" style={{ color: 'gray', gridArea: `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`}}>
                    {determineElements(gameboard, x, y)}
                  </div>
                ))
            })}
  </div>
  </div>
  : null }
  </>
);
   }

export default Tutorial;
