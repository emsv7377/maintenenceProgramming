import React, { useEffect } from 'react';
import { useState } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';

function GameBoard(props) {
  const rows = [];
  console.log(props)
  const { width, height } = props;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // state for the player's position
  const [open, setOpen] = useState(false) // state for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.

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
  }

  // add eventlistner for keypresses. When a key is pressed, handleKeyPress is called.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  // change open state and player coordinates every 300 ms.
  useEffect(() => {
    setTimeout(() => {
      setOpen(!open)
      move()
    }, 200)
  }, [open])
  //setTimeout(() => setOpen(!open), 500)

  for (let y = 0; y < height; y++) {
    const cells = [];

    for (let x = 0; x < width; x++) {
      cells.push({ x, y });
    }
    rows.push(cells);

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

    return <Cheese/>
  }

  return (
    <div className="game-board" style={{backgroundColor: 'gray',}}>
      {rows.map((cells, y) => (
        <div key={y} className="row">
          {cells.map(({ x, _y }) => (
            <div key={`${x}-${y}`} className="cell">
              {determineElements(x,y)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
