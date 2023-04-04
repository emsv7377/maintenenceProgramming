import React from 'react';
import Cheese from './Cheese';

function GameBoard(props) {
  const rows = [];
  console.log(props)
  const { width, height } = props;

  for (let y = 0; y < height; y++) {
    const cells = [];

    for (let x = 0; x < width; x++) {
      cells.push({ x, y });
    }
    rows.push(cells);

  }
  console.log(rows)

  return (
    <div className="game-board" style={{backgroundColor: 'gray',}}>
      {rows.map((cells, y) => (
        <div key={y} className="row">
          {cells.map(({ x, y }) => (
            <div key={`${x}-${y}`} className="cell">
              <Cheese/>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
