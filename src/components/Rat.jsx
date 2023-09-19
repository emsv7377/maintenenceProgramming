/**
 * File: Rat.jsx 
 * 
 * This file contains the logic for the rat component
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */
function Rat({ open, direction, powerupActive}) {

  let transform = ''
  if (direction === 'l') transform = 'scaleX(-1)'//flip an image
  if (direction === 'u') transform = 'rotate(-90deg)' // rotates an element around a fixed point on the 2D plane
  if (direction === 'r') transform = 'rotate(0deg)'
  if (direction === 'd') transform = 'rotate(90deg)'

  return(
      <img 
      src={`rat-${open ? 'open' : 'closed'}.svg`} // read different filenames depending on open prop
      alt="rat2"
      style={{
          width: '100%',
          height: '100%',
          transform: transform
      }}
      />
  )
}

export default Rat;