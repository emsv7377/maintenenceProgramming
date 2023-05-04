function Rat({ open }) {

  return(
      <img 
      src={`rat-${open ? 'open' : 'closed'}.svg`} // read different filenames depending on open prop
      alt="rat2"
      style={{
          width: '100%',
          height: '100%'
      }}
      />
  )
}

export default Rat;