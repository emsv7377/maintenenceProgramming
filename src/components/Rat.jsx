function Rat({ open, direction }) {

  let transform = ''
  if (direction === 'l') transform = 'scaleX(-1)'
  if (direction === 'u') transform = 'rotate(-90deg)'
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