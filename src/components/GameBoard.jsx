import React from 'react';
//import { useNavigation } from 'react-router-dom';

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

  function navTutorial(){
    console.log('Tutorial not implemented')
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
            <div key={`${x}-${y}`} className="cell"/>
            ))}
        </div>
      ))}
    </div>
    </>
  );
}

export default GameBoard;
