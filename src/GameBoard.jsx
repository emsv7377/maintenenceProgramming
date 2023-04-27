import React, { useEffect } from 'react';
import { useState } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';

function GameBoard(props) {
  const rows = [];
  console.log(props)
  const { width, height } = props;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1});
  const [open, setOpen] = useState(false)
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own)

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

  const move = () => {
    switch (direction) {
      case 'r':
        setPlayerCoords({ x: (playerCoords.x + 1) % width, y: playerCoords.y})
        break
      case 'l':
        setPlayerCoords({ x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y})
        break
      case 'u':
        setPlayerCoords({ x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)})
        break
      case 'd':
        setPlayerCoords({ x: playerCoords.x, y: (playerCoords.y + 1) % height})
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setOpen(!open)
      move()
    }, 300)
  }, [open])
  //setTimeout(() => setOpen(!open), 500)

  for (let y = 0; y < height; y++) {
    const cells = [];

    for (let x = 0; x < width; x++) {
      cells.push({ x, y });
    }
    rows.push(cells);

  }
  console.log(rows)

  const determineElements = (x, y) => {
    if (x === playerCoords.x && y === playerCoords.y) {
      return <Rat open={open}/> //<div onClick={() => setPlayerCoords({x: playerCoords.x + 1, y: playerCoords.y + 1})}><Rat2/></div>
    }
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      return <Brick/>
    }
    if (y === 2 && x < width - 5 && x > 1) {
      return <Brick/>
    }
    if (y > 2 && y < height - 2 && x === 2){
      return <Brick/>
    }
    if (x === 4 && y < height - 2 && y > height - 8){
      return <Brick/>
    }
    if (x === 5 && y < height - 5 && y > height - 8){
      return <Brick/>
    }
    if (x === 6 && ((y < height - 5 && y > height - 8) || (y < height - 2 && y > height - 5))){
      return <Brick/>
    }
    if (x === 7 && y < height - 2 && y > height - 5){
      return <Brick/>
    }
    if (x === 8 && ((y < height - 2 && y > height - 6) || (y === height - 7))){
      return <Brick/>
    }
    if (x === 10 && y < height - 2 && y > height - 9){
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
