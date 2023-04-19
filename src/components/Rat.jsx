import React from 'react';

function Rat(props) {
  const { x, y } = props.position; // Get x and y from props.position
  return(
    <img 
    src="Rat.svg"
    alt="Rat"
    style={{
        width: '60%',
        height: '60%'
    }}
    />
)
}


export default Rat;